from pathlib import Path

from PIL import Image
from reportlab.lib.colors import HexColor, Color, white
from reportlab.lib.pagesizes import A4, landscape
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas
from reportlab.lib.utils import ImageReader


ROOT = Path("/Users/omarfaysal/Documents/faysal-site")
ASSETS = ROOT / "tmp/pdfs/clocky_assets/png"
EVIDENCE = ROOT / "tmp/pdfs/clocky_assets"
OUT = ROOT / "output/pdf/clocky-digital-experience-proposal.pdf"

PAGE_W, PAGE_H = landscape(A4)

INK = HexColor("#141414")
BURGUNDY = HexColor("#61272D")
BURGUNDY_DARK = HexColor("#42191D")
BURGUNDY_SOFT = HexColor("#8E545A")
CREAM = HexColor("#F3EFE8")
PAPER = HexColor("#FBF8F3")
MUTED = HexColor("#6E6964")
LINE = HexColor("#DED6CC")
GOLD = HexColor("#B28A50")
GREEN = HexColor("#426652")


pdfmetrics.registerFont(TTFont("Arial", "/System/Library/Fonts/Supplemental/Arial.ttf"))
pdfmetrics.registerFont(TTFont("Arial-Bold", "/System/Library/Fonts/Supplemental/Arial Bold.ttf"))
pdfmetrics.registerFont(TTFont("Arial-Italic", "/System/Library/Fonts/Supplemental/Arial Italic.ttf"))
pdfmetrics.registerFont(TTFont("Georgia", "/System/Library/Fonts/Supplemental/Georgia.ttf"))
pdfmetrics.registerFont(TTFont("Georgia-Bold", "/System/Library/Fonts/Supplemental/Georgia Bold.ttf"))


def set_fill(c, color):
    c.setFillColor(color)


def rounded(c, x, y, w, h, r=14, fill=PAPER, stroke=None, sw=1):
    c.saveState()
    c.setFillColor(fill)
    if stroke:
        c.setStrokeColor(stroke)
        c.setLineWidth(sw)
        c.roundRect(x, y, w, h, r, fill=1, stroke=1)
    else:
        c.roundRect(x, y, w, h, r, fill=1, stroke=0)
    c.restoreState()


def pill(c, x, y, text, fill, fg=white, font="Arial-Bold", size=8, pad_x=9, h=19):
    w = pdfmetrics.stringWidth(text, font, size) + 2 * pad_x
    rounded(c, x, y, w, h, h / 2, fill=fill)
    c.setFont(font, size)
    c.setFillColor(fg)
    c.drawCentredString(x + w / 2, y + (h - size) / 2 + 1.8, text)
    return w


def wrap_lines(text, font, size, max_width):
    words = text.split()
    lines, current = [], ""
    for word in words:
        test = word if not current else f"{current} {word}"
        if pdfmetrics.stringWidth(test, font, size) <= max_width:
            current = test
        else:
            if current:
                lines.append(current)
            current = word
    if current:
        lines.append(current)
    return lines


def text_block(c, text, x, y_top, max_width, font="Arial", size=11, color=INK,
               leading=None, max_lines=None):
    leading = leading or size * 1.35
    lines = wrap_lines(text, font, size, max_width)
    if max_lines:
        lines = lines[:max_lines]
    c.setFont(font, size)
    c.setFillColor(color)
    y = y_top
    for line in lines:
        c.drawString(x, y, line)
        y -= leading
    return y


def draw_image_fill(c, image_path, x, y, w, h, radius=0, tint=None):
    image_path = Path(image_path)
    with Image.open(image_path) as im:
        iw, ih = im.size
    scale = max(w / iw, h / ih)
    dw, dh = iw * scale, ih * scale
    dx, dy = x + (w - dw) / 2, y + (h - dh) / 2
    c.saveState()
    if radius:
        clip = c.beginPath()
        clip.roundRect(x, y, w, h, radius)
        c.clipPath(clip, stroke=0, fill=0)
    c.drawImage(ImageReader(str(image_path)), dx, dy, dw, dh, preserveAspectRatio=True, mask="auto")
    if tint:
        color, alpha = tint
        c.setFillColor(color)
        c.setFillAlpha(alpha)
        c.rect(x, y, w, h, fill=1, stroke=0)
        c.setFillAlpha(1)
    c.restoreState()


def draw_page_number(c, n, dark=False):
    fg = CREAM if dark else MUTED
    c.setFont("Arial", 8)
    c.setFillColor(fg)
    c.drawRightString(PAGE_W - 40, 23, f"FAYSAL STUDIO  /  CLOCKY PROPOSAL  /  {n:02d}")


def draw_kicker(c, text, x=42, y=PAGE_H - 40, color=BURGUNDY):
    c.setFillColor(color)
    c.setFont("Arial-Bold", 8)
    c.drawString(x, y, text.upper())


def metric_card(c, x, y, w, value, label, accent=BURGUNDY):
    rounded(c, x, y, w, 74, 12, fill=white, stroke=LINE)
    c.setFillColor(accent)
    c.setFont("Georgia-Bold", 23)
    c.drawString(x + 15, y + 37, value)
    c.setFillColor(MUTED)
    c.setFont("Arial", 8.6)
    c.drawString(x + 15, y + 18, label)


def finding_card(c, x, y, w, h, number, title, body, priority):
    rounded(c, x, y, w, h, 13, fill=white, stroke=LINE)
    c.setFillColor(BURGUNDY)
    c.setFont("Georgia-Bold", 19)
    c.drawString(x + 15, y + h - 26, f"0{number}")
    pill(c, x + w - 59, y + h - 29, priority.upper(), BURGUNDY_SOFT if priority == "High" else GOLD,
         size=7, pad_x=7, h=17)
    c.setFillColor(INK)
    c.setFont("Arial-Bold", 11)
    c.drawString(x + 15, y + h - 48, title)
    text_block(c, body, x + 15, y + h - 67, w - 30, font="Arial", size=8.5,
               color=MUTED, leading=11.4)


def content_pillar(c, x, y, w, title, body, number):
    c.setFillColor(BURGUNDY)
    c.setFont("Georgia-Bold", 17)
    c.drawString(x, y, f"{number:02d}")
    c.setFillColor(INK)
    c.setFont("Arial-Bold", 9.5)
    c.drawString(x + 29, y + 2, title)
    text_block(c, body, x + 29, y - 13, w - 29, size=8.1, color=MUTED, leading=10.8)


def phase_card(c, x, y, w, number, title, body, deliverable):
    rounded(c, x, y, w, 186, 14, fill=white, stroke=LINE)
    pill(c, x + 14, y + 151, f"WEEK {number}", BURGUNDY, size=7.5, pad_x=9, h=19)
    c.setFillColor(INK)
    c.setFont("Georgia-Bold", 16)
    c.drawString(x + 14, y + 125, title)
    body_y = text_block(c, body, x + 14, y + 101, w - 28, size=8.5, color=MUTED, leading=12)
    c.setStrokeColor(LINE)
    c.setLineWidth(0.7)
    c.line(x + 14, y + 43, x + w - 14, y + 43)
    c.setFillColor(BURGUNDY)
    c.setFont("Arial-Bold", 7.5)
    c.drawString(x + 14, y + 29, "OUTPUT")
    text_block(c, deliverable, x + 14, y + 16, w - 28, font="Arial-Bold", size=7.8,
               color=INK, leading=10)


def prepare_evidence():
    """Prepare presentation crops; public screenshot evidence is not retouched."""
    source = EVIDENCE / "evidence-arabic-full.jpg"
    if not source.exists():
        return
    with Image.open(source) as im:
        # The full-page browser export uses a half-width page render. These crops
        # preserve the rendered content while removing the unused white canvas.
        im.crop((0, 3260, 640, 3860)).save(EVIDENCE / "evidence-arabic-mixed-crop.jpg", quality=92)
        im.crop((0, 4140, 640, 4820)).save(EVIDENCE / "evidence-videos-crop.jpg", quality=92)

    profile_source = EVIDENCE / "evidence-instagram-profile.jpg"
    if profile_source.exists():
        with Image.open(profile_source).convert("RGB") as im:
            # Keep only Clocky's public header. The personal Instagram sidebar,
            # mutual-account line and message tray are excluded from the crop.
            public_header = im.crop((260, 35, 1030, 245))
            frame = Image.new("RGB", (1280, 720), (10, 14, 16))
            scale = min(1120 / public_header.width, 500 / public_header.height)
            resized = public_header.resize(
                (round(public_header.width * scale), round(public_header.height * scale)),
                Image.Resampling.LANCZOS,
            )
            frame.paste(resized, ((frame.width - resized.width) // 2, (frame.height - resized.height) // 2))
            frame.save(EVIDENCE / "evidence-instagram-profile-public.jpg", quality=94)

    reels_source = EVIDENCE / "evidence-instagram-reels.jpg"
    if reels_source.exists():
        with Image.open(reels_source).convert("RGB") as im:
            # Retain the public Reel grid and visible counts while removing the
            # signed-in account controls and the personal message tray.
            im.crop((165, 0, 1115, 534)).save(
                EVIDENCE / "evidence-instagram-reels-public.jpg", quality=94
            )


def pain_card(c, x, y, w, h, number, title, body, cost, evidence):
    rounded(c, x, y, w, h, 13, fill=white, stroke=LINE)
    c.setFillColor(BURGUNDY)
    c.setFont("Georgia-Bold", 18)
    c.drawString(x + 16, y + h - 27, f"0{number}")
    c.setFont("Arial-Bold", 10.5)
    c.setFillColor(INK)
    c.drawString(x + 51, y + h - 23, title)
    text_block(c, body, x + 16, y + h - 52, w - 32, size=8.6, color=MUTED, leading=12)
    c.setStrokeColor(LINE)
    c.setLineWidth(0.7)
    c.line(x + 16, y + 36, x + w - 16, y + 36)
    c.setFillColor(BURGUNDY)
    c.setFont("Arial-Bold", 7.2)
    c.drawString(x + 16, y + 21, f"BUSINESS COST: {cost.upper()}")
    c.setFillColor(MUTED)
    c.setFont("Arial-Italic", 6.8)
    c.drawRightString(x + w - 16, y + 21, evidence)


def journey_card(c, x, y, w, h, number, stage, pain, effect):
    rounded(c, x, y, w, h, 12, fill=white, stroke=LINE)
    pill(c, x + 12, y + h - 33, f"{number:02d}", BURGUNDY, size=7, pad_x=8, h=18)
    c.setFillColor(INK)
    c.setFont("Arial-Bold", 10)
    c.drawString(x + 12, y + h - 56, stage)
    text_block(c, pain, x + 12, y + h - 78, w - 24, size=8, color=MUTED, leading=11)
    c.setFillColor(BURGUNDY)
    c.setFont("Arial-Bold", 7)
    c.drawString(x + 12, y + 22, effect.upper())


def experience_step(c, x, y, number, title, body, line_width=390):
    c.setStrokeColor(GOLD)
    c.setLineWidth(1)
    c.circle(x + 10, y + 4, 10, fill=0, stroke=1)
    c.setFillColor(GOLD)
    c.setFont("Arial-Bold", 7)
    c.drawCentredString(x + 10, y + 1.5, f"{number:02d}")
    c.setFillColor(CREAM)
    c.setFont("Arial-Bold", 10)
    c.drawString(x + 34, y + 2, title)
    text_block(c, body, x + 34, y - 14, line_width, size=8.2,
               color=HexColor("#CFC4BE"), leading=11)


def social_issue(c, x, y, w, number, title, body):
    c.setFillColor(BURGUNDY)
    c.setFont("Georgia-Bold", 15)
    c.drawString(x, y, f"{number:02d}")
    c.setFillColor(INK)
    c.setFont("Arial-Bold", 9.2)
    c.drawString(x + 30, y + 1, title)
    text_block(c, body, x + 30, y - 14, w - 30, size=7.8, color=MUTED, leading=10.5)


def content_series(c, x, y, w, title, body, number):
    rounded(c, x, y, w, 54, 10, fill=white, stroke=LINE)
    pill(c, x + 11, y + 24, f"{number:02d}", BURGUNDY, size=6.8, pad_x=7, h=17)
    c.setFillColor(INK)
    c.setFont("Arial-Bold", 8.7)
    c.drawString(x + 52, y + 33, title)
    c.setFillColor(MUTED)
    c.setFont("Arial", 7.5)
    c.drawString(x + 52, y + 17, body)


def funnel_card(c, x, y, w, number, title, result):
    rounded(c, x, y, w, 90, 12, fill=white, stroke=LINE)
    c.setFillColor(BURGUNDY)
    c.setFont("Georgia-Bold", 15)
    c.drawString(x + 13, y + 61, f"{number:02d}")
    c.setFillColor(INK)
    c.setFont("Arial-Bold", 8.8)
    c.drawString(x + 13, y + 40, title)
    c.setFillColor(GREEN)
    c.setFont("Arial-Bold", 7.3)
    c.drawString(x + 13, y + 19, result.upper())


def page_1(c):
    c.setFillColor(BURGUNDY_DARK)
    c.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
    draw_image_fill(c, ASSETS / "3a04dd34bcfb75f9.png", PAGE_W * 0.48, 0, PAGE_W * 0.52, PAGE_H,
                    tint=(BURGUNDY_DARK, 0.20))

    c.setFillColor(CREAM)
    c.setFont("Arial-Bold", 9)
    c.drawString(46, PAGE_H - 48, "FAY / SAL   STUDIO")
    c.setFillColor(GOLD)
    c.circle(33, PAGE_H - 45, 5, fill=1, stroke=0)

    pill(c, 46, PAGE_H - 104, "DIGITAL EXPERIENCE PROPOSAL", CREAM, fg=BURGUNDY_DARK,
         size=7.4, pad_x=10, h=20)
    c.setFillColor(CREAM)
    c.setFont("Georgia-Bold", 38)
    c.drawString(46, PAGE_H - 162, "Clocky")
    c.setFont("Georgia", 25)
    c.drawString(46, PAGE_H - 199, "A red-carpet journey")
    c.drawString(46, PAGE_H - 231, "for watches worth wanting.")

    text_block(
        c,
        "The pain points standing between Clocky's product quality and a premium digital buying experience - followed by a focused plan to close that gap.",
        46, PAGE_H - 277, 340, font="Arial", size=11, color=HexColor("#E9DDD6"), leading=16,
    )

    rounded(c, 46, 69, 335, 74, 12, fill=Color(1, 1, 1, alpha=0.08), stroke=Color(1, 1, 1, alpha=0.18))
    c.setFillColor(CREAM)
    c.setFont("Arial-Bold", 8)
    c.drawString(61, 119, "PREPARED FOR")
    c.setFont("Arial", 10)
    c.drawString(61, 99, "Clocky EGY")
    c.setFont("Arial-Bold", 8)
    c.drawString(225, 119, "PREPARED BY")
    c.setFont("Arial", 10)
    c.drawString(225, 99, "FAYSAL Studio")
    c.setFont("Arial", 8)
    c.setFillColor(HexColor("#CDBDB6"))
    c.drawString(61, 81, "14 September 2026")
    draw_page_number(c, 1, dark=True)
    c.showPage()


def page_2(c):
    c.setFillColor(PAPER)
    c.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
    draw_kicker(c, "01 / Social reach")
    c.setFillColor(INK)
    c.setFont("Georgia-Bold", 28)
    c.drawString(42, PAGE_H - 80, "Clocky's product quality is ahead of its reach.")
    text_block(c,
               "The account has built a useful content base, but the audience size and visible Reel views show that the content is not compounding yet.",
               43, PAGE_H - 108, 700, size=9.8, color=MUTED, leading=14)

    draw_image_fill(c, EVIDENCE / "evidence-instagram-profile-public.jpg", 42, 169, 470, 264, radius=14)
    rounded(c, 529, 169, 271, 264, 14, fill=white, stroke=LINE)
    c.setFillColor(BURGUNDY)
    c.setFont("Arial-Bold", 8)
    c.drawString(548, 409, "PUBLIC INSTAGRAM SNAPSHOT")
    c.setFillColor(INK)
    c.setFont("Georgia-Bold", 30)
    c.drawString(548, 363, "718")
    c.setFont("Arial", 8.5)
    c.setFillColor(MUTED)
    c.drawString(548, 347, "followers")
    c.setFillColor(BURGUNDY)
    c.setFont("Georgia-Bold", 22)
    c.drawString(670, 363, "200")
    c.setFont("Arial", 8.5)
    c.setFillColor(MUTED)
    c.drawString(670, 347, "posts")
    c.setStrokeColor(LINE)
    c.line(548, 326, 781, 326)
    social_issue(c, 548, 296, 233, 1, "Content looks catalogue-led",
                 "The product appears often, but the brand story and human proof stay limited.")
    social_issue(c, 548, 243, 233, 2, "Reach is not compounding",
                 "Visible views remain close to or below the existing follower base.")
    social_issue(c, 548, 202, 233, 3, "The next step is weak",
                 "Interest is pushed to DM or the homepage instead of the exact watch.")

    rounded(c, 42, 73, PAGE_W - 84, 72, 12, fill=BURGUNDY_DARK)
    c.setFillColor(GOLD)
    c.setFont("Arial-Bold", 8)
    c.drawString(60, 119, "THE SOCIAL PAIN POINT")
    c.setFillColor(CREAM)
    c.setFont("Georgia-Bold", 16)
    c.drawString(60, 94, "Clocky is producing content, but not yet building a repeatable discovery-to-sale system.")
    c.setFont("Arial-Italic", 6.8)
    c.setFillColor(MUTED)
    c.drawString(42, 51, "Profile figures and screenshot captured from @clocky.eg on 14 September 2026.")
    draw_page_number(c, 2)
    c.showPage()


def page_3(c):
    c.setFillColor(CREAM)
    c.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
    draw_kicker(c, "02 / Social to commerce")
    c.setFillColor(INK)
    c.setFont("Georgia-Bold", 28)
    c.drawString(42, PAGE_H - 80, "Reach is not fixed by posting more.")
    c.setFillColor(BURGUNDY)
    c.drawString(42, PAGE_H - 113, "It grows when every post has a job.")
    text_block(c, "The goal is not only views. It is qualified attention that reaches the exact watch and continues toward a purchase.",
               43, PAGE_H - 140, 690, size=9.5, color=MUTED, leading=13)

    draw_image_fill(c, EVIDENCE / "evidence-instagram-reels-public.jpg", 42, 203, 365, 205, radius=13)
    rounded(c, 42, 163, 365, 45, 0, fill=BURGUNDY_DARK)
    c.setFillColor(CREAM)
    c.setFont("Arial-Bold", 8.3)
    c.drawString(57, 187, "VISIBLE RECENT REELS  /  192  /  503  /  520 VIEWS")
    c.setFont("Arial", 7.5)
    c.setFillColor(HexColor("#D8CBC6"))
    c.drawString(57, 173, "Product close-ups are strong raw material; the distribution system is the gap.")

    c.setFillColor(INK)
    c.setFont("Arial-Bold", 8.5)
    c.drawString(435, 423, "THE NEW CONTENT ENGINE")
    content_series(c, 435, 351, 173, "Clocky Proof", "Quality, inspection, warranty.", 1)
    content_series(c, 618, 351, 182, "On the Wrist", "People, sizing and styling.", 2)
    content_series(c, 435, 287, 173, "Watch School", "Simple education and care.", 3)
    content_series(c, 618, 287, 182, "Choose Your Watch", "Compare style, use and budget.", 4)
    content_series(c, 435, 223, 365, "Drops and Offers", "One product, one story and one clear action.", 5)

    rounded(c, 42, 69, PAGE_W - 84, 72, 12, fill=white, stroke=LINE)
    c.setFillColor(BURGUNDY)
    c.setFont("Arial-Bold", 7.5)
    c.drawString(58, 119, "THE SHOPPABLE PATH")
    steps = ["REEL HOOK", "PRODUCT PROOF", "SHOP THIS WATCH", "EXACT PRODUCT PAGE", "WHATSAPP / CHECKOUT"]
    x = 58
    for index, step in enumerate(steps):
        c.setFillColor(INK if index < 4 else GREEN)
        c.setFont("Arial-Bold", 7.4)
        c.drawString(x, 91, step)
        sw = pdfmetrics.stringWidth(step, "Arial-Bold", 7.4)
        if index < len(steps) - 1:
            c.setFillColor(GOLD)
            c.setFont("Arial-Bold", 11)
            c.drawString(x + sw + 11, 89, ">")
            x += sw + 34
    c.setFont("Arial-Italic", 6.8)
    c.setFillColor(MUTED)
    c.drawString(42, 48, "Reel view counts are a point-in-time public observation and will change as content continues to run.")
    draw_page_number(c, 3)
    c.showPage()


def page_4(c):
    c.setFillColor(PAPER)
    c.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
    draw_kicker(c, "03 / The site pain points")
    c.setFillColor(INK)
    c.setFont("Georgia-Bold", 28)
    c.drawString(42, PAGE_H - 80, "The product is not the problem.")
    c.setFillColor(BURGUNDY)
    c.drawString(42, PAGE_H - 114, "The experience around it is.")
    text_block(c, "Clocky has strong products and visual material. The current journey breaks that premium feeling before interest becomes a purchase.",
               43, PAGE_H - 142, 690, size=10.2, color=MUTED, leading=14)

    gap = 13
    card_w = (PAGE_W - 84 - gap) / 2
    pain_card(c, 42, 284, card_w, 137, 1, "Arabic feels translated, not localized",
              "The Arabic experience mixes languages and uses inconsistent product wording. A premium buyer should never have to decode the store.",
              "Lower trust", "See evidence 01")
    pain_card(c, 42 + card_w + gap, 284, card_w, 137, 2, "Video interest has nowhere to go",
              "A customer can like a watch inside a video, but cannot move directly to that exact product. Desire is created, then the path stops.",
              "Lost purchase intent", "See evidence 02")
    pain_card(c, 42, 130, card_w, 137, 3, "The structure feels fragmented",
              "Sections, long product rows and content blocks do not form one clear selling story. Customers browse around instead of moving forward.",
              "More friction", "See evidence 03")
    pain_card(c, 42 + card_w + gap, 130, card_w, 137, 4, "Premium products feel ordinary online",
              "The spacing, hierarchy and product presentation do not give each watch enough focus, guidance or perceived value.",
              "Lower perceived quality", "See evidence 03")

    rounded(c, 42, 69, PAGE_W - 84, 48, 10, fill=BURGUNDY_DARK)
    c.setFillColor(GOLD)
    c.setFont("Arial-Bold", 8)
    c.drawString(57, 98, "05  /  PERFORMANCE INSTABILITY")
    c.setFillColor(CREAM)
    c.setFont("Arial", 8)
    c.drawString(57, 82, "More than 70 console errors were observed. This creates avoidable speed, reliability and tracking risk.")
    c.setFont("Arial-Italic", 6.8)
    c.setFillColor(MUTED)
    c.drawString(42, 52, "Observations are based on the public Clocky storefront. No analytics or store administration access was used.")
    draw_page_number(c, 4)
    c.showPage()


def page_5(c):
    c.setFillColor(PAPER)
    c.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
    draw_kicker(c, "04 / Evidence from the current site")
    c.setFillColor(INK)
    c.setFont("Georgia-Bold", 28)
    c.drawString(42, PAGE_H - 80, "The gaps are visible in the journey")
    text_block(c, "Real screenshots captured from clockyeg.com/ar on 14 September 2026.",
               43, PAGE_H - 108, 610, size=9.5, color=MUTED)

    shot_w, shot_h = 353, 192
    draw_image_fill(c, EVIDENCE / "evidence-arabic-mixed-crop.jpg", 42, 263, shot_w, shot_h, radius=12)
    rounded(c, 42, 227, shot_w, 43, 0, fill=BURGUNDY_DARK)
    c.setFillColor(CREAM)
    c.setFont("Arial-Bold", 8.5)
    c.drawString(55, 248, "EVIDENCE 01  /  MIXED ARABIC AND ENGLISH")
    c.setFont("Arial", 7.6)
    c.setFillColor(HexColor("#D8CBC6"))
    c.drawString(55, 235, "English headings and product naming remain inside the Arabic store.")

    draw_image_fill(c, EVIDENCE / "evidence-videos-crop.jpg", 414, 263, 386, shot_h, radius=12)
    rounded(c, 414, 227, 386, 43, 0, fill=BURGUNDY_DARK)
    c.setFillColor(CREAM)
    c.setFont("Arial-Bold", 8.5)
    c.drawString(427, 248, "EVIDENCE 02  /  VIDEOS ARE NOT SHOPPABLE")
    c.setFont("Arial", 7.6)
    c.setFillColor(HexColor("#D8CBC6"))
    c.drawString(427, 235, "The video row shows watches without a direct path to each product.")

    draw_image_fill(c, EVIDENCE / "evidence-arabic-homepage.jpg", 42, 61, 265, 145, radius=12)
    rounded(c, 324, 61, 476, 145, 12, fill=white, stroke=LINE)
    c.setFillColor(BURGUNDY)
    c.setFont("Arial-Bold", 8.5)
    c.drawString(343, 181, "EVIDENCE 03  /  THE SELLING STORY IS DISTRIBUTED")
    c.setFillColor(INK)
    c.setFont("Georgia-Bold", 16)
    c.drawString(343, 152, "Attractive pieces, but no guided showroom.")
    text_block(c, "The hero, long product grids, collection blocks, brand rows and a separate video area compete for attention. The customer sees content, but is not led through a deliberate premium journey.",
               343, 126, 425, size=8.7, color=MUTED, leading=12.2)
    c.setFillColor(BURGUNDY)
    c.setFont("Arial-Bold", 7.5)
    c.drawString(343, 76, "RESULT: INTEREST IS CREATED IN ONE PLACE AND LOST BEFORE THE NEXT STEP")
    draw_page_number(c, 5)
    c.showPage()


def page_6(c):
    c.setFillColor(PAPER)
    c.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
    draw_kicker(c, "05 / Performance evidence")
    c.setFillColor(INK)
    c.setFont("Georgia-Bold", 28)
    c.drawString(42, PAGE_H - 80, "The storefront is carrying technical weight.")
    text_block(c, "A premium journey should feel instant and controlled. The current test results show clear room to improve speed and runtime stability.",
               43, PAGE_H - 108, 690, size=9.8, color=MUTED, leading=14)

    draw_image_fill(c, EVIDENCE / "evidence-pagespeed-mobile.png", 42, 302, 367, 160, radius=12)
    draw_image_fill(c, EVIDENCE / "evidence-pagespeed-desktop.png", 431, 302, 369, 160, radius=12)
    pill(c, 55, 315, "MOBILE  /  PERFORMANCE 60", BURGUNDY, size=7.2, pad_x=9, h=19)
    pill(c, 444, 315, "DESKTOP  /  PERFORMANCE 57", BURGUNDY, size=7.2, pad_x=9, h=19)

    draw_image_fill(c, EVIDENCE / "evidence-runtime-errors.png", 42, 75, 420, 213, radius=12)
    rounded(c, 479, 75, 321, 213, 12, fill=white, stroke=LINE)
    c.setFillColor(BURGUNDY)
    c.setFont("Arial-Bold", 8)
    c.drawString(497, 264, "EVIDENCE 04  /  RUNTIME ERRORS")
    c.setFillColor(INK)
    c.setFont("Georgia-Bold", 21)
    c.drawString(497, 231, "76 console errors")
    c.setFont("Georgia", 15)
    c.setFillColor(BURGUNDY)
    c.drawString(497, 209, "and 7 reported issues")
    text_block(c,
               "Runtime errors can delay media, break interactive features, interfere with measurement and make every future change harder to test safely.",
               497, 180, 279, size=8.5, color=MUTED, leading=12)
    rounded(c, 497, 95, 279, 49, 9, fill=HexColor("#EEF3ED"), stroke=HexColor("#CAD8CD"))
    c.setFillColor(GREEN)
    c.setFont("Arial-Bold", 7.2)
    c.drawString(509, 128, "TRACKING FOUND")
    c.setFont("Arial", 7.6)
    c.drawString(509, 113, "Meta Pixel is loaded; Shopify reports Facebook CAPI enabled.")
    c.setFont("Arial-Italic", 6.8)
    c.setFillColor(MUTED)
    c.drawString(42, 52, "PageSpeed Insights lab results and browser-console capture supplied on 14 September 2026. Scores are estimates and may vary.")
    draw_page_number(c, 6)
    c.showPage()


def page_7(c):
    c.setFillColor(INK)
    c.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
    draw_kicker(c, "06 / The red-carpet experience", color=GOLD)
    c.setFillColor(CREAM)
    c.setFont("Georgia-Bold", 27)
    c.drawString(42, PAGE_H - 80, "A watch buyer should feel guided,")
    c.setFillColor(GOLD)
    c.drawString(42, PAGE_H - 113, "not left to search.")
    text_block(c, "Watches are a considered, niche purchase. The site should feel like a private showroom: calm, clear and reassuring at every step.",
               43, PAGE_H - 140, 475, size=9.8, color=HexColor("#CFC4BE"), leading=14)

    experience_step(c, 43, 378, 1, "Arrival",
                    "A distinct Arabic and English welcome, written naturally for each customer.")
    experience_step(c, 43, 316, 2, "Curated showroom",
                    "Browse by style, occasion, budget and product type - with less noise and clearer direction.")
    experience_step(c, 43, 246, 3, "Shoppable watch story",
                    "Every video names the watch and opens its exact product page through a clear 'Shop this watch' action.")
    experience_step(c, 43, 176, 4, "Confidence lounge",
                    "Product type, specifications, close-ups, customer proof, delivery, returns and warranty sit beside the decision.")
    experience_step(c, 43, 101, 5, "Concierge checkout",
                    "A simple checkout and visible WhatsApp support make the final step feel personal and effortless.")

    draw_image_fill(c, ASSETS / "cabe2596b3b741e2.png", 560, 80, 240, 378, radius=18, tint=(INK, 0.08))
    c.setStrokeColor(GOLD)
    c.setLineWidth(1.2)
    c.roundRect(560, 80, 240, 378, 18, fill=0, stroke=1)
    rounded(c, 578, 98, 204, 72, 11, fill=Color(0.05, 0.05, 0.05, alpha=0.78), stroke=Color(0.7, 0.54, 0.31, alpha=0.65))
    c.setFillColor(GOLD)
    c.setFont("Arial-Bold", 7.5)
    c.drawString(592, 146, "THE EXPERIENCE PRINCIPLE")
    c.setFillColor(CREAM)
    c.setFont("Georgia-Bold", 13)
    c.drawString(592, 123, "One watch. One story.")
    c.drawString(592, 106, "One effortless next step.")
    draw_page_number(c, 7, dark=True)
    c.showPage()


def page_8(c):
    c.setFillColor(PAPER)
    c.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
    draw_kicker(c, "07 / Focused implementation")
    c.setFillColor(INK)
    c.setFont("Georgia-Bold", 28)
    c.drawString(42, PAGE_H - 80, "Fix the buying journey first.")
    c.setFillColor(BURGUNDY)
    c.drawString(42, PAGE_H - 113, "No unnecessary rebuild.")
    text_block(c, "A four-week sprint focused on the points that most affect clarity, trust and purchase intent.",
               43, PAGE_H - 139, 650, size=10, color=MUTED)

    gap = 12
    card_w = (PAGE_W - 84 - gap * 3) / 4
    y = 248
    phase_card(c, 42, y, card_w, 1, "Map and prioritize",
               "Audit social and site together, then rank each issue by sales impact, effort and urgency.",
               "One connected journey map")
    phase_card(c, 42 + card_w + gap, y, card_w, 2, "Design the system",
               "Create the content series, bilingual storefront structure and premium product-page direction.",
               "A social and UX system")
    phase_card(c, 42 + 2 * (card_w + gap), y, card_w, 3, "Connect and build",
               "Link Reels and site videos to exact watches, then move trust beside each buying decision.",
               "A shoppable content journey")
    phase_card(c, 42 + 3 * (card_w + gap), y, card_w, 4, "Test and launch",
               "Test mobile, Arabic, performance and tracking events, then launch and measure the first cycle.",
               "A measured first release")

    rounded(c, 42, 75, PAGE_W - 84, 142, 16, fill=BURGUNDY_DARK)
    c.setFillColor(GOLD)
    c.setFont("Arial-Bold", 8)
    c.drawString(62, 188, "THE FIRST SPRINT")
    c.setFillColor(CREAM)
    c.setFont("Georgia-Bold", 22)
    c.drawString(62, 155, "Turn every moment of interest into an easy next step.")
    text_block(c,
               "FAYSAL Studio would redesign the path from arrival to product discovery to purchase - while preserving what Clocky already does well.",
               62, 125, 540, size=9.5, color=HexColor("#DCCEC8"), leading=13)
    pill(c, PAGE_W - 238, 112, "NEXT: PRIORITY + SCOPE SESSION", CREAM, fg=BURGUNDY_DARK,
         size=7.7, pad_x=11, h=22)

    c.setFont("Arial", 7)
    c.setFillColor(MUTED)
    c.drawString(42, 51, "Evidence captured from the public storefront on 14 September 2026. Final scope follows analytics and admin review.")
    draw_page_number(c, 8)
    c.showPage()


def page_9(c):
    c.setFillColor(PAPER)
    c.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
    draw_kicker(c, "08 / Sales impact model")
    c.setFillColor(INK)
    c.setFont("Georgia-Bold", 28)
    c.drawString(42, PAGE_H - 80, "Solving the pain points improves the whole funnel.")
    text_block(c,
               "The result is not one isolated design win. It is more qualified attention, less lost intent and a higher chance that each visit becomes an order.",
               43, PAGE_H - 108, 720, size=9.6, color=MUTED, leading=13.5)

    gap = 10
    fw = (PAGE_W - 84 - gap * 4) / 5
    funnel_card(c, 42, 375, fw, 1, "Stronger social reach", "More qualified visits")
    funnel_card(c, 42 + (fw + gap), 375, fw, 2, "Shoppable videos", "More product views")
    funnel_card(c, 42 + 2 * (fw + gap), 375, fw, 3, "Premium localization", "Higher buyer trust")
    funnel_card(c, 42 + 3 * (fw + gap), 375, fw, 4, "Faster stable site", "Fewer drop-offs")
    funnel_card(c, 42 + 4 * (fw + gap), 375, fw, 5, "Clear proof and CTA", "More completed orders")

    rounded(c, 42, 105, PAGE_W - 84, 238, 14, fill=white, stroke=LINE)
    c.setFillColor(BURGUNDY_DARK)
    c.roundRect(42, 299, PAGE_W - 84, 44, 14, fill=1, stroke=0)
    c.rect(42, 299, PAGE_W - 84, 22, fill=1, stroke=0)
    c.setFillColor(CREAM)
    c.setFont("Arial-Bold", 8)
    c.drawString(59, 316, "ILLUSTRATIVE SALES MODEL  /  PER 10,000 QUALIFIED SITE VISITS")

    columns = [59, 244, 398, 596, 737]
    headers = ["SCENARIO", "CONVERSION", "ORDERS", "REVENUE @ EGP 4K AOV", "UPLIFT"]
    c.setFillColor(MUTED)
    c.setFont("Arial-Bold", 7.2)
    for x, header in zip(columns, headers):
        c.drawString(x, 277, header)

    rows = [
        ("Assumed baseline", "0.8%", "80", "EGP 320,000", "-"),
        ("Conservative improvement", "1.0%", "100", "EGP 400,000", "+25%"),
        ("Strong improvement", "1.2%", "120", "EGP 480,000", "+50%"),
    ]
    row_ys = [240, 201, 162]
    for idx, (row, y) in enumerate(zip(rows, row_ys)):
        if idx > 0:
            c.setFillColor(HexColor("#F4F7F3"))
            c.rect(52, y - 13, PAGE_W - 104, 32, fill=1, stroke=0)
        c.setFillColor(INK)
        c.setFont("Arial-Bold" if idx else "Arial", 8.5)
        for x, value in zip(columns, row):
            c.drawString(x, y, value)
        c.setStrokeColor(LINE)
        c.setLineWidth(0.5)
        c.line(52, y - 16, PAGE_W - 52, y - 16)

    c.setFillColor(BURGUNDY)
    c.setFont("Arial-Bold", 8.2)
    c.drawString(59, 125, "WHAT THIS MEANS")
    c.setFillColor(INK)
    c.setFont("Georgia-Bold", 13)
    c.drawString(164, 122, "+40 orders per 10,000 visits when conversion moves from 0.8% to 1.2%.")

    rounded(c, 42, 61, PAGE_W - 84, 30, 8, fill=BURGUNDY_DARK)
    c.setFillColor(CREAM)
    c.setFont("Arial-Bold", 7.7)
    c.drawCentredString(PAGE_W / 2, 72, "ANY GROWTH IN QUALIFIED SOCIAL TRAFFIC ADDS ON TOP OF THE CONVERSION IMPROVEMENT")
    c.setFont("Arial-Italic", 6.7)
    c.setFillColor(MUTED)
    c.drawString(42, 43, "Illustrative scenario only, not a guarantee. Replace assumed conversion and AOV with Clocky's actual analytics before financial planning.")
    draw_page_number(c, 9)
    c.showPage()


def build():
    prepare_evidence()
    OUT.parent.mkdir(parents=True, exist_ok=True)
    c = canvas.Canvas(str(OUT), pagesize=(PAGE_W, PAGE_H))
    c.setTitle("Clocky Digital Experience Proposal")
    c.setAuthor("FAYSAL Studio")
    c.setSubject("Customer experience pain points and focused redesign proposal for Clocky EGY")
    for fn in (page_1, page_2, page_3, page_4, page_5, page_6, page_7, page_8, page_9):
        fn(c)
    c.save()
    print(OUT)


if __name__ == "__main__":
    build()
