#!/usr/bin/env python3
"""Create an evidence-led, client-facing PDF review of Locally's app and site."""

from pathlib import Path
from PIL import Image, ImageDraw, ImageOps
from reportlab.pdfgen import canvas
from reportlab.lib.colors import HexColor, Color
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib.utils import ImageReader


ROOT = Path('/Users/omarfaysal/Documents/faysal-site')
TMP = ROOT / 'tmp/pdfs/locally_assets'
OUT = ROOT / 'output/pdf/locally-digital-experience-proposal-en.pdf'
DL = Path('/Users/omarfaysal/Downloads')
W, H = 960, 540

BLUE = HexColor('#235CCA')
DEEP = HexColor('#12243E')
INK = HexColor('#19283C')
MUTED = HexColor('#586675')
PAPER = HexColor('#F6F7F5')
SKY = HexColor('#E8F0FF')
PALE = HexColor('#D8E5FF')
ORANGE = HexColor('#F06B4D')
WHITE = HexColor('#FFFFFF')
LINE = HexColor('#CDD7E3')


def prepare():
    TMP.mkdir(parents=True, exist_ok=True)
    OUT.parent.mkdir(parents=True, exist_ok=True)

    # Pixel-accurate privacy masks. The original checkout captures never enter the PDF.
    upper = Image.open(DL / 'IMG_2156.PNG').convert('RGB')
    d = ImageDraw.Draw(upper)
    d.rounded_rectangle((56, 485, 1110, 700), radius=16, fill='#E8F0FF')
    d.text((82, 550), 'Personal delivery details hidden', fill='#235CCA')
    d.rounded_rectangle((56, 1490, 1110, 1690), radius=16, fill='#E8F0FF')
    d.text((82, 1560), 'Delivery address hidden', fill='#235CCA')
    upper.save(TMP / 'checkout-redacted.jpg', quality=92)

    lower = Image.open(DL / 'IMG_2157.PNG').convert('RGB')
    lower.crop((0, 580, 1284, 2778)).save(TMP / 'checkout-summary-cropped.jpg', quality=92)

    # Crop out Chrome tabs, Gmail, bookmarks, and dock from the supplied PSI capture.
    psi = Image.open(DL / 'Screenshot 2026-09-16 at 10.01.02 AM.png').convert('RGB')
    psi.crop((360, 445, 2490, 1820)).save(TMP / 'pagespeed-private-crop.jpg', quality=94)

    # Extract only the supplied studio mark; no generated replacement or full logo block.
    logo = Image.open(ROOT / 'tmp/pdfs/clocky_assets/faysal-studio-icon-exact.png').convert('RGBA')
    alpha = logo.getchannel('A')
    bbox = alpha.getbbox()
    if bbox:
        logo = logo.crop(bbox)
    logo.save(TMP / 'studio-mark.png')


def fonts():
    base = Path('/System/Library/Fonts/Supplemental')
    pdfmetrics.registerFont(TTFont('Arial', str(base / 'Arial.ttf')))
    pdfmetrics.registerFont(TTFont('ArialBold', str(base / 'Arial Bold.ttf')))
    pdfmetrics.registerFont(TTFont('ArialBlack', str(base / 'Arial Black.ttf')))
    pdfmetrics.registerFont(TTFont('ArialItalic', str(base / 'Arial Italic.ttf')))


def fit_lines(s, font, size, width):
    lines = []
    for para in s.split('\n'):
        if not para:
            lines.append('')
            continue
        words = para.split()
        line = words[0]
        for word in words[1:]:
            nxt = line + ' ' + word
            if pdfmetrics.stringWidth(nxt, font, size) <= width:
                line = nxt
            else:
                lines.append(line)
                line = word
        lines.append(line)
    return lines


def text(c, s, x, y, size=15, color=INK, font='Arial', width=None, leading=None):
    c.setFillColor(color)
    c.setFont(font, size)
    lines = fit_lines(s, font, size, width) if width else s.split('\n')
    leading = leading or size * 1.28
    for line in lines:
        c.drawString(x, y, line)
        y -= leading
    return y


def rule(c, x, y, width, color=LINE, thickness=1):
    c.setStrokeColor(color)
    c.setLineWidth(thickness)
    c.line(x, y, x + width, y)


def rect(c, x, y, width, height, fill, radius=0):
    c.setFillColor(fill)
    if radius:
        c.roundRect(x, y, width, height, radius, fill=1, stroke=0)
    else:
        c.rect(x, y, width, height, fill=1, stroke=0)


def image_cover(c, path, x, y, width, height, radius=0, crop=None):
    im = Image.open(path)
    if crop:
        im = im.crop(crop)
    iw, ih = im.size
    scale = max(width / iw, height / ih)
    dw, dh = iw * scale, ih * scale
    dx, dy = x + (width - dw) / 2, y + (height - dh) / 2
    c.saveState()
    p = c.beginPath()
    if radius:
        p.roundRect(x, y, width, height, radius)
    else:
        p.rect(x, y, width, height)
    c.clipPath(p, stroke=0, fill=0)
    c.drawImage(ImageReader(im), dx, dy, dw, dh)
    c.restoreState()


def image_contain(c, path, x, y, width, height):
    im = Image.open(path)
    iw, ih = im.size
    scale = min(width / iw, height / ih)
    dw, dh = iw * scale, ih * scale
    c.drawImage(ImageReader(im), x + (width-dw)/2, y + (height-dh)/2, dw, dh, mask='auto')


def footer(c, n, source, dark=False):
    fg = PALE if dark else MUTED
    c.setFont('Arial', 8.5)
    c.setFillColor(fg)
    c.drawString(42, 24, 'FAYSAL STUDIO  /  PRIVATE REVIEW')
    c.drawCentredString(W/2, 24, source)
    c.drawRightString(W-42, 24, f'{n:02d} / 12')


def header(c, kicker, title, n, source, dark=False):
    bg = DEEP if dark else PAPER
    fg = WHITE if dark else INK
    rect(c, 0, 0, W, H, bg)
    text(c, kicker.upper(), 42, 501, 9.5, PALE if dark else BLUE, 'ArialBold')
    text(c, title, 42, 465, 31, fg, 'ArialBlack')
    footer(c, n, source, dark)


def pill(c, label, x, y, bg=SKY, fg=BLUE, size=10):
    width = pdfmetrics.stringWidth(label, 'ArialBold', size) + 24
    rect(c, x, y-7, width, 27, bg, 13)
    text(c, label, x+12, y+2, size, fg, 'ArialBold')
    return width


def note(c, label, body, x, y, width, accent=BLUE):
    rect(c, x, y-9, 4, 48, accent, 2)
    text(c, label, x+16, y+23, 11, accent, 'ArialBold')
    return text(c, body, x+16, y+3, 12.5, INK, width=width-22, leading=17)


def phone(c, path, x, y, width, height, crop=None):
    rect(c, x-5, y-5, width+10, height+10, DEEP, 17)
    image_cover(c, path, x, y, width, height, radius=12, crop=crop)


def draw_cover(c):
    rect(c, 0, 0, W, H, DEEP)
    rect(c, 0, 0, 15, H, BLUE)
    text(c, 'LOCALLY  ×  FAYSAL STUDIO', 55, 485, 12, PALE, 'ArialBold')
    text(c, 'Good brands deserve', 55, 386, 37, WHITE, 'ArialBlack')
    text(c, 'a smoother way', 55, 340, 37, WHITE, 'ArialBlack')
    text(c, 'to shop.', 55, 294, 37, WHITE, 'ArialBlack')
    text(c, 'A focused review of the app and website—\nfrom first tap to final order.', 55, 226, 17, PALE, width=470, leading=25)
    rect(c, 55, 77, 315, 44, BLUE, 22)
    text(c, 'SEPTEMBER 2026  /  PRIVATE REVIEW', 73, 94, 10, WHITE, 'ArialBold')
    # Brand-led visual, clipped to a tall editorial panel.
    image_cover(c, DL / 'IMG_2152.PNG', 606, 68, 302, 414, 8,
                crop=(0, 320, 1284, 1680))
    rect(c, 585, 51, 136, 41, BLUE, 2)
    text(c, 'APP + WEB', 601, 66, 12, WHITE, 'ArialBlack')
    image_contain(c, TMP / 'studio-mark.png', 47, 14, 29, 38)
    text(c, 'FAYSAL STUDIO', 84, 30, 9.5, PALE, 'ArialBold')
    c.showPage()


def draw_thesis(c):
    header(c, 'The short version', 'The idea is strong. The journey has leaks.', 2,
           'Manual app review + public website, 16 Sep 2026')
    text(c, 'Locally brings many Egyptian labels into one place. Try On and Reels could make it feel different from a standard store.',
         42, 407, 17, INK, width=800, leading=24)
    rule(c, 42, 345, 876)
    items = [
        ('01', 'WAIT', 'A 30–60 second app launch and slow videos can lose people before they browse.'),
        ('02', 'FIND', 'Campaigns and brand logos look bold, but products and next steps need a clearer path.'),
        ('03', 'TRUST', 'Try On is unreliable in this test; checkout makes address and payment harder than needed.'),
    ]
    for i, (num, label, body) in enumerate(items):
        x = 42 + i*298
        text(c, num, x, 295, 42, BLUE, 'ArialBlack')
        text(c, label, x, 258, 14, DEEP, 'ArialBlack')
        text(c, body, x, 229, 13.2, MUTED, width=253, leading=18)
        if i < 2:
            rect(c, x+279, 160, 1, 135, LINE)
    rect(c, 42, 62, 876, 70, SKY, 8)
    text(c, 'The opportunity', 61, 104, 13, BLUE, 'ArialBold')
    text(c, 'Keep the attitude. Remove the moments that make shopping feel like work.',
         61, 78, 17.5, INK, 'ArialBold')
    c.showPage()


def draw_start(c):
    header(c, 'App / first impression', 'The first minute should not be a loading screen.', 3,
           'Evidence: supplied app captures; launch time from one manual test')
    pill(c, '30–60s observed launch', 42, 409, BLUE, WHITE)
    text(c, 'That is enough time for a shopper to leave before seeing a product. The next screen uses a lot of black space to ask for location, without showing what they gain.',
         42, 365, 16.2, INK, width=446, leading=23)
    note(c, 'Also in account creation', 'No Google, Apple or Facebook sign-in in the tested flow.',
         42, 265, 447)
    rule(c, 42, 196, 446)
    text(c, 'Make the first tap easy', 42, 170, 17, DEEP, 'ArialBold')
    text(c, 'Load the home shell first; defer heavy media. Offer guest browsing and quick sign-in. Ask for location when delivery context is useful.',
         42, 145, 13, MUTED, width=440, leading=18)
    phone(c, DL / 'IMG_2150.PNG', 556, 70, 150, 326)
    phone(c, DL / 'IMG_2151.PNG', 737, 70, 150, 326)
    c.showPage()


def draw_home(c):
    header(c, 'App / discovery', 'Big campaign energy. Small shopping cues.', 4,
           'Evidence: supplied home-screen captures')
    phone(c, DL / 'IMG_2152.PNG', 42, 66, 183, 359)
    phone(c, DL / 'IMG_2153.PNG', 248, 66, 183, 359)
    text(c, 'What a shopper sees', 479, 400, 13, BLUE, 'ArialBold')
    text(c, 'The hero fills the screen. Products sit further down. A moving promo strip competes with the bottom navigation.',
         479, 368, 18, INK, width=415, leading=26)
    rule(c, 479, 272, 407)
    text(c, 'The brand grid looks good, but logos alone do not tell a new shopper what each label sells. The sparkle badges on product cards need a clearer explanation.',
         479, 246, 13.6, MUTED, width=407, leading=20)
    rect(c, 479, 78, 407, 75, SKY, 8)
    text(c, 'A cleaner first screen', 497, 127, 13, BLUE, 'ArialBold')
    text(c, 'One strong campaign + visible product paths + a quieter promo treatment.',
         497, 105, 14.5, INK, width=365, leading=19)
    c.showPage()


def draw_reels(c):
    header(c, 'App / Reels', 'A video feed cannot ask people to wait.', 5,
           'Timing and quality reported from one manual app test', dark=True)
    text(c, '5–10', 50, 343, 103, WHITE, 'ArialBlack')
    text(c, 'seconds between videos', 53, 298, 22, PALE, 'ArialBold')
    text(c, 'The next clip loads slowly and appears in low quality. In a swipe-first feature, the delay breaks the rhythm—and the path from inspiration to product should be obvious.',
         53, 247, 17.5, WHITE, width=566, leading=26)
    rect(c, 662, 115, 241, 270, BLUE, 12)
    text(c, 'Make it feel instant', 686, 344, 18, WHITE, 'ArialBlack')
    text(c, 'Preload the next clip\nUse adaptive video quality\nShow a poster while loading\nDeep-link to the item',
         686, 296, 14, WHITE, width=188, leading=35)
    text(c, 'Measurement: swipe-to-first-frame time + reel-to-product taps.',
         53, 92, 12, PALE, 'ArialItalic', width=560)
    c.showPage()


def draw_tryon(c):
    header(c, 'App / Try On', 'The Try On feature has to earn trust.', 6,
           'Three attempts described in the manual app review')
    rect(c, 42, 311, 876, 100, SKY, 8)
    text(c, '2', 65, 334, 57, BLUE, 'ArialBlack')
    text(c, 'failed attempts', 131, 363, 17, DEEP, 'ArialBold')
    text(c, 'then a similar—but different—piece appeared on the third try.',
         131, 332, 16.2, INK, width=737)
    text(c, 'A shopper will rarely give a feature three chances.', 42, 275, 25, INK, 'ArialBlack')
    rule(c, 42, 245, 876)
    cols = [
        ('Before', 'Guide the photo: pose, lighting, framing, supported items.'),
        ('During', 'Show progress and a clear retry path when processing fails.'),
        ('After', 'Keep the result tied to the exact SKU, colour and size selected.'),
    ]
    for i, (label, body) in enumerate(cols):
        x = 42+i*298
        text(c, label, x, 201, 16, BLUE, 'ArialBold')
        text(c, body, x, 171, 14, MUTED, width=255, leading=20)
    text(c, 'Track success rate, processing time and “add to bag” after Try On before promoting it harder.',
         42, 68, 12, INK, 'ArialItalic')
    c.showPage()


def draw_checkout(c):
    header(c, 'App / checkout', 'The last step should feel like the easiest one.', 7,
           'Evidence: supplied checkout captures; personal details hidden')
    phone(c, TMP / 'checkout-redacted.jpg', 42, 69, 184, 359,
          crop=(0, 190, 1284, 2290))
    phone(c, TMP / 'checkout-summary-cropped.jpg', 247, 69, 184, 359)
    x = 478
    y = 401
    y = note(c, 'Address', 'The address block is not tappable; the small “Edit” link is the only clear way in. No map pin appeared in the tested flow.', x, y, 420)
    y = note(c, 'Payment', 'Selection is hard to discover, and a house icon is reused for payment and delivery.', x, y-24, 420)
    y = note(c, 'Summary', '“Estimated Total” appears twice. A 0.00 savings row adds noise at the moment of decision.', x, y-24, 420)
    rect(c, 478, 75, 416, 50, BLUE, 7)
    text(c, 'Make the address card and payment choice unmistakably tappable.',
         493, 102, 12.6, WHITE, 'ArialBold', width=386, leading=16)
    c.showPage()


def draw_structure(c):
    header(c, 'App / navigation', 'Save for later is not the same as buy now.', 8,
           'Bag / wishlist merger noted in the manual app review')
    text(c, 'The bag and wishlist are merged in the tested experience. That mixes two different intentions: “I want this now” and “I might come back.”',
         42, 390, 20, INK, width=837, leading=29)
    rect(c, 42, 151, 420, 171, SKY, 9)
    text(c, 'BAG', 68, 282, 23, BLUE, 'ArialBlack')
    text(c, 'Ready to order', 68, 250, 15, INK, 'ArialBold')
    text(c, 'Size, quantity, delivery and a clean route to checkout.',
         68, 217, 14, MUTED, width=355, leading=20)
    rect(c, 497, 151, 420, 171, DEEP, 9)
    text(c, 'SAVED', 523, 282, 23, WHITE, 'ArialBlack')
    text(c, 'Maybe later', 523, 250, 15, PALE, 'ArialBold')
    text(c, 'A place to compare, revisit and move an item into the bag.',
         523, 217, 14, WHITE, width=351, leading=20)
    text(c, 'Separating them is a small product decision with a clear shopper benefit: less confusion near checkout.',
         42, 94, 14.5, INK, width=870)
    c.showPage()


def draw_website(c):
    header(c, 'Website / discovery', 'The site looks alive. The path could be calmer.', 9,
           'Evidence: public locallyeg.com homepage captured 16 Sep 2026')
    image_cover(c, ROOT / 'tmp/pdfs/locally-home.png', 42, 185, 876, 233, 5,
                crop=(0, 0, 1440, 380))
    text(c, 'Two navigation rows + a moving message bar + a full-height campaign compete before the first product choice.',
         42, 151, 16.4, INK, width=840, leading=22)
    text(c, 'Keep the strong art direction; simplify the top choices, reduce moving distractions, and make product categories or best sellers easier to reach on mobile.',
         42, 103, 13.5, MUTED, width=854, leading=19)
    c.showPage()


def draw_performance(c):
    header(c, 'Website / mobile speed', 'The website also makes people wait.', 10,
           'Source: supplied PageSpeed Insights capture; mobile field data, latest 28 days')
    rect(c, 42, 80, 444, 330, WHITE, 8)
    image_contain(c, TMP / 'pagespeed-private-crop.jpg', 55, 92, 418, 306)
    text(c, '13.7s', 530, 352, 49, BLUE, 'ArialBlack')
    text(c, 'First Contentful Paint', 531, 321, 15, INK, 'ArialBold')
    text(c, '12.6s', 530, 253, 49, ORANGE, 'ArialBlack')
    text(c, 'Time to First Byte', 531, 222, 15, INK, 'ArialBold')
    text(c, 'These figures are from the supplied mobile report, not an app benchmark. Diagnose server response first, then media weight and critical rendering.',
         530, 166, 13.4, MUTED, width=363, leading=19)
    c.showPage()


def draw_plan(c):
    header(c, 'The proposed sprint', 'Fix what costs a sale first.', 11,
           'Sequence is provisional; confirm effort after product and analytics access')
    steps = [
        ('01', 'REMOVE THE WAIT',
         'Measure cold start; improve the first usable screen. Tackle website server response and critical rendering. Preload the next Reel.',
         'Track: app start, FCP/TTFB, video first frame'),
        ('02', 'CLEAR THE PATH TO ORDER',
         'Make address and payment easy to edit. Add a map-pin option where useful. Separate bag from saved items; reduce signup friction.',
         'Track: checkout completion, payment selection'),
        ('03', 'MAKE TRY ON WORTH REVISITING',
         'Test failures across garments and devices, keep results tied to exact products, add clear recovery, and connect Reels to product pages.',
         'Track: Try On success, add-to-bag after use'),
    ]
    for i, (num, title, body, metric) in enumerate(steps):
        y = 379-i*119
        text(c, num, 42, y, 28, BLUE, 'ArialBlack')
        text(c, title, 108, y+2, 16, INK, 'ArialBlack')
        text(c, body, 108, y-23, 12.6, MUTED, width=753, leading=17)
        text(c, metric, 108, y-63, 10.5, BLUE, 'ArialBold')
        if i < 2:
            rule(c, 108, y-82, 789)
    c.showPage()


def draw_impact(c):
    header(c, 'The commercial case', 'Same traffic. More orders.', 12,
           'Illustrative scenario only; replace assumptions with Locally analytics', dark=True)
    text(c, 'Example with 10,000 qualified visits / month and EGP 800 average order value',
         42, 411, 16.2, PALE, width=830)
    values = [
        ('BASELINE EXAMPLE', '1.5%', '150 orders', 'EGP 120k'),
        ('SMALL LIFT', '1.7%', '170 orders', 'EGP 136k'),
        ('STRONGER LIFT', '2.0%', '200 orders', 'EGP 160k'),
    ]
    for i, (label, rate, orders, revenue) in enumerate(values):
        x = 42 + i*297
        bg = BLUE if i == 2 else HexColor('#213954')
        rect(c, x, 200, 269, 174, bg, 8)
        text(c, label, x+18, 343, 10.5, PALE, 'ArialBold')
        text(c, rate, x+18, 287, 42, WHITE, 'ArialBlack')
        text(c, orders, x+18, 252, 14, WHITE, 'ArialBold')
        text(c, revenue, x+18, 222, 18, WHITE, 'ArialBlack')
    text(c, 'The next move', 42, 157, 14, PALE, 'ArialBold')
    text(c, 'A focused sprint: fix load time, stabilize Try On, simplify checkout, then tune discovery and Reels.',
         42, 129, 17.2, WHITE, width=860, leading=23)
    text(c, 'We would baseline app starts, Try On success, checkout completion and web conversion first. No sales outcome is guaranteed.',
         42, 70, 11.3, PALE, width=860, leading=16)
    c.showPage()


def main():
    prepare()
    fonts()
    c = canvas.Canvas(str(OUT), pagesize=(W, H), pageCompression=1)
    c.setTitle('Locally | App and Website Experience Review')
    c.setAuthor('Faysal Studio')
    for fn in [draw_cover, draw_thesis, draw_start, draw_home, draw_reels,
               draw_tryon, draw_checkout, draw_structure, draw_website,
               draw_performance, draw_plan, draw_impact]:
        fn(c)
    c.save()
    print(OUT)


if __name__ == '__main__':
    main()
