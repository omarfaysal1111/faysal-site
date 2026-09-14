from pathlib import Path
import sys


ROOT = Path("/Users/omarfaysal/Documents/faysal-site")
sys.path.insert(0, str(ROOT / "tmp/pdfs/pydeps"))
sys.path.insert(0, str(ROOT / "tmp/pdfs"))

import arabic_reshaper
from bidi.algorithm import get_display
from reportlab.lib.colors import HexColor, white
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas

import build_clocky_review as base


OUT = ROOT / "output/pdf/clocky-digital-experience-proposal-ar.pdf"
EVIDENCE = ROOT / "tmp/pdfs/clocky_assets"
ASSETS = ROOT / "tmp/pdfs/clocky_assets/png"
LOGO_SOURCE = EVIDENCE / "faysal-studio-logo-lockup.jpg"
LOGO_ICON = EVIDENCE / "faysal-studio-icon-exact.png"
PAGE_W, PAGE_H = base.PAGE_W, base.PAGE_H

INK = base.INK
BURGUNDY = base.BURGUNDY
BURGUNDY_DARK = base.BURGUNDY_DARK
BURGUNDY_SOFT = base.BURGUNDY_SOFT
CREAM = base.CREAM
PAPER = base.PAPER
MUTED = base.MUTED
LINE = base.LINE
GOLD = base.GOLD
GREEN = base.GREEN


pdfmetrics.registerFont(TTFont("Arabic", "/System/Library/Fonts/Supplemental/Tahoma.ttf"))
pdfmetrics.registerFont(TTFont("Arabic-Bold", "/System/Library/Fonts/Supplemental/Tahoma Bold.ttf"))


def prepare_logo_icon():
    """Extract the original connected F/circuit mark without redrawing it."""
    if not LOGO_SOURCE.exists():
        raise FileNotFoundError(f"Logo not found: {LOGO_SOURCE}")
    crop_box = (50, 45, 760, 900)
    with base.Image.open(LOGO_SOURCE).convert("RGB") as im:
        source = im.crop(crop_box)
        icon = base.Image.new("RGBA", source.size, (255, 255, 255, 0))
        source_px = source.load()
        icon_px = icon.load()
        for y in range(source.height):
            for x in range(source.width):
                r, g, b = source_px[x, y]
                # The original mark is white; the burgundy/black gradient remains transparent.
                alpha = max(0, min(255, round((min(r, g, b) - 95) * 255 / 135)))
                # Remove the separate wordmark while retaining the long lower stem of the F.
                if y + crop_box[1] >= 735 and x + crop_box[0] >= 205:
                    alpha = 0
                icon_px[x, y] = (255, 255, 255, alpha)

        alpha_channel = icon.getchannel("A")
        bbox = alpha_channel.getbbox()
        if bbox is None:
            raise ValueError("Could not isolate the logo icon")
        pad = 10
        left = max(0, bbox[0] - pad)
        top = max(0, bbox[1] - pad)
        right = min(icon.width, bbox[2] + pad)
        bottom = min(icon.height, bbox[3] + pad)
        icon.crop((left, top, right, bottom)).save(LOGO_ICON)


def draw_logo_icon(c, x, y, w, h):
    """Place only the exact extracted icon, preserving its transparent background."""
    with base.Image.open(LOGO_ICON) as im:
        iw, ih = im.size
    scale = min(w / iw, h / ih)
    dw, dh = iw * scale, ih * scale
    dx, dy = x + (w - dw) / 2, y + (h - dh) / 2
    c.drawImage(str(LOGO_ICON), dx, dy, dw, dh, preserveAspectRatio=True, mask="auto")


def shape(text):
    return get_display(arabic_reshaper.reshape(text))


def ar_width(text, font, size):
    return pdfmetrics.stringWidth(shape(text), font, size)


def ar_wrap(text, font, size, max_width):
    words = text.split()
    lines = []
    current = ""
    for word in words:
        test = word if not current else f"{current} {word}"
        if ar_width(test, font, size) <= max_width:
            current = test
        else:
            if current:
                lines.append(current)
            current = word
    if current:
        lines.append(current)
    return lines


def ar_text(c, text, x_right, y_top, max_width, font="Arabic", size=10,
            color=INK, leading=None, max_lines=None):
    leading = leading or size * 1.55
    lines = ar_wrap(text, font, size, max_width)
    if max_lines:
        lines = lines[:max_lines]
    c.setFont(font, size)
    c.setFillColor(color)
    y = y_top
    for line in lines:
        c.drawRightString(x_right, y, shape(line))
        y -= leading
    return y


def ar_line(c, text, x_right, y, font="Arabic", size=10, color=INK):
    c.setFont(font, size)
    c.setFillColor(color)
    c.drawRightString(x_right, y, shape(text))


def kicker(c, text, y=PAGE_H - 40, color=BURGUNDY):
    ar_line(c, text, PAGE_W - 42, y, font="Arabic-Bold", size=8, color=color)


def page_number(c, number, dark=False):
    color = CREAM if dark else MUTED
    c.setFillColor(color)
    c.setFont("Arial", 8)
    c.drawRightString(PAGE_W - 40, 23, f"FAYSAL STUDIO  /  CLOCKY  /  {number:02d}")


def ar_pill(c, x, y, w, text, fill=BURGUNDY, fg=white, size=7.5):
    base.rounded(c, x, y, w, 20, 10, fill=fill)
    c.setFillColor(fg)
    c.setFont("Arabic-Bold", size)
    c.drawCentredString(x + w / 2, y + 6.2, shape(text))


def social_issue(c, x, y, w, number, title, body):
    c.setFillColor(BURGUNDY)
    c.setFont("Georgia-Bold", 15)
    c.drawRightString(x + w, y, f"{number:02d}")
    ar_line(c, title, x + w - 32, y + 1, font="Arabic-Bold", size=8.8)
    ar_text(c, body, x + w - 32, y - 14, w - 32, size=7.6, color=MUTED, leading=10.5)


def content_series(c, x, y, w, title, body, number):
    base.rounded(c, x, y, w, 54, 10, fill=white, stroke=LINE)
    c.setFillColor(BURGUNDY)
    c.setFont("Georgia-Bold", 11)
    c.drawRightString(x + w - 12, y + 31, f"{number:02d}")
    ar_line(c, title, x + w - 42, y + 33, font="Arabic-Bold", size=8.2)
    ar_line(c, body, x + w - 42, y + 17, size=7.1, color=MUTED)


def pain_card(c, x, y, w, h, number, title, body, cost, evidence):
    base.rounded(c, x, y, w, h, 13, fill=white, stroke=LINE)
    c.setFillColor(BURGUNDY)
    c.setFont("Georgia-Bold", 17)
    c.drawRightString(x + w - 16, y + h - 28, f"{number:02d}")
    ar_line(c, title, x + w - 52, y + h - 25, font="Arabic-Bold", size=9.8)
    ar_text(c, body, x + w - 16, y + h - 54, w - 32, size=8.1, color=MUTED, leading=11.5)
    c.setStrokeColor(LINE)
    c.setLineWidth(0.7)
    c.line(x + 16, y + 36, x + w - 16, y + 36)
    ar_line(c, f"الأثر التجاري: {cost}", x + w - 16, y + 21,
            font="Arabic-Bold", size=7.1, color=BURGUNDY)
    ar_line(c, evidence, x + 77, y + 21, size=6.6, color=MUTED)


def experience_step(c, x_right, y, number, title, body, width=390):
    c.setStrokeColor(GOLD)
    c.setLineWidth(1)
    c.circle(x_right - 10, y + 4, 10, fill=0, stroke=1)
    c.setFillColor(GOLD)
    c.setFont("Arial-Bold", 7)
    c.drawCentredString(x_right - 10, y + 1.5, f"{number:02d}")
    ar_line(c, title, x_right - 34, y + 2, font="Arabic-Bold", size=9.5, color=CREAM)
    ar_text(c, body, x_right - 34, y - 15, width, size=7.8,
            color=HexColor("#CFC4BE"), leading=11)


def phase_card(c, x, y, w, number, title, body, deliverable):
    base.rounded(c, x, y, w, 186, 14, fill=white, stroke=LINE)
    ar_pill(c, x + w - 72, y + 151, 58, f"الأسبوع {number}", size=7)
    ar_line(c, title, x + w - 14, y + 124, font="Arabic-Bold", size=13.5)
    ar_text(c, body, x + w - 14, y + 99, w - 28, size=7.8, color=MUTED, leading=11.5)
    c.setStrokeColor(LINE)
    c.setLineWidth(0.7)
    c.line(x + 14, y + 43, x + w - 14, y + 43)
    ar_line(c, "المخرج", x + w - 14, y + 29, font="Arabic-Bold", size=7.2, color=BURGUNDY)
    ar_line(c, deliverable, x + w - 14, y + 15, font="Arabic-Bold", size=7.3)


def funnel_card(c, x, y, w, number, title, result):
    base.rounded(c, x, y, w, 90, 12, fill=white, stroke=LINE)
    c.setFillColor(BURGUNDY)
    c.setFont("Georgia-Bold", 15)
    c.drawRightString(x + w - 13, y + 62, f"{number:02d}")
    ar_line(c, title, x + w - 13, y + 40, font="Arabic-Bold", size=7.8)
    ar_line(c, result, x + w - 13, y + 19, font="Arabic-Bold", size=6.7, color=GREEN)


def page_1(c):
    c.setFillColor(BURGUNDY_DARK)
    c.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
    base.draw_image_fill(c, ASSETS / "3a04dd34bcfb75f9.png", PAGE_W * 0.48, 0,
                         PAGE_W * 0.52, PAGE_H, tint=(BURGUNDY_DARK, 0.20))

    draw_logo_icon(c, 42, PAGE_H - 111, 46, 58)

    base.rounded(c, 102, PAGE_H - 103, 175, 20, 10, fill=CREAM)
    ar_line(c, "مقترح لتطوير التجربة الرقمية", 264, PAGE_H - 97,
            font="Arabic-Bold", size=7.4, color=BURGUNDY_DARK)

    c.setFillColor(CREAM)
    c.setFont("Georgia-Bold", 35)
    c.drawString(46, PAGE_H - 160, "Clocky")
    ar_text(c, "رحلة شراء تليق بساعات تستحق الاقتناء.", 390, PAGE_H - 202, 345,
            font="Arabic-Bold", size=22, color=CREAM, leading=33)
    ar_text(c,
            "قراءة عملية للفجوات التي تفصل بين جودة منتجات Clocky وتجربة شراء رقمية راقية، يليها مسار تنفيذي واضح لإغلاق هذه الفجوات.",
            390, PAGE_H - 284, 345, size=10, color=HexColor("#E9DDD6"), leading=16)

    base.rounded(c, 46, 69, 335, 74, 12, fill=HexColor("#252326"), stroke=HexColor("#595356"))
    ar_line(c, "أُعدّ لصالح", 205, 119, font="Arabic-Bold", size=7.5, color=CREAM)
    c.setFont("Arial", 10)
    c.setFillColor(CREAM)
    c.drawRightString(205, 99, "Clocky EGY")
    ar_line(c, "إعداد", 364, 119, font="Arabic-Bold", size=7.5, color=CREAM)
    c.setFont("Arial", 10)
    c.drawRightString(364, 99, "FAYSAL Studio")
    ar_line(c, "14 سبتمبر 2026", 205, 81, size=7.5, color=HexColor("#CDBDB6"))
    page_number(c, 1, dark=True)
    c.showPage()


def page_2(c):
    c.setFillColor(PAPER)
    c.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
    kicker(c, "01 / الوصول عبر السوشيال ميديا")
    ar_line(c, "جودة منتجات Clocky تسبق حجم وصولها.", PAGE_W - 42, PAGE_H - 80,
            font="Arabic-Bold", size=25)
    ar_text(c,
            "الحساب يمتلك قاعدة جيدة من المحتوى، لكن حجم الجمهور والمشاهدات الظاهرة للريلز يوضحان أن الوصول لا ينمو بشكل تراكمي حتى الآن.",
            PAGE_W - 43, PAGE_H - 108, 700, size=9.2, color=MUTED, leading=14)

    base.draw_image_fill(c, EVIDENCE / "evidence-instagram-profile-public.jpg",
                         42, 169, 470, 264, radius=14)
    base.rounded(c, 529, 169, 271, 264, 14, fill=white, stroke=LINE)
    ar_line(c, "لقطة عامة من إنستجرام", 781, 409, font="Arabic-Bold", size=8, color=BURGUNDY)
    c.setFont("Georgia-Bold", 30)
    c.setFillColor(INK)
    c.drawRightString(781, 363, "718")
    ar_line(c, "متابعاً", 781, 347, size=8.2, color=MUTED)
    c.setFont("Georgia-Bold", 22)
    c.setFillColor(BURGUNDY)
    c.drawRightString(685, 363, "200")
    ar_line(c, "منشور", 685, 347, size=8.2, color=MUTED)
    c.setStrokeColor(LINE)
    c.line(548, 326, 781, 326)
    social_issue(c, 548, 296, 233, 1, "المحتوى أقرب إلى كتالوج",
                 "المنتج حاضر باستمرار، لكن قصة العلامة والتجربة الإنسانية وإثبات الجودة ما زالت محدودة.")
    social_issue(c, 548, 243, 233, 2, "الوصول لا يتراكم",
                 "المشاهدات الظاهرة قريبة من عدد المتابعين الحالي أو أقل منه.")
    social_issue(c, 548, 202, 233, 3, "الخطوة التالية غير واضحة",
                 "الاهتمام ينتهي برسالة مباشرة أو الصفحة الرئيسية بدلاً من الانتقال إلى الساعة نفسها.")

    base.rounded(c, 42, 73, PAGE_W - 84, 72, 12, fill=BURGUNDY_DARK)
    ar_line(c, "جوهر مشكلة السوشيال ميديا", PAGE_W - 60, 119,
            font="Arabic-Bold", size=8, color=GOLD)
    ar_line(c, "الحساب ينشر محتوى، لكنه لا يبني بعد نظاماً متكرراً يحوّل الاكتشاف إلى شراء.",
            PAGE_W - 60, 94, font="Arabic-Bold", size=14.5, color=CREAM)
    ar_line(c, "الأرقام ولقطة الشاشة مأخوذة من الحساب العام @clocky.eg بتاريخ 14 سبتمبر 2026.",
            PAGE_W - 42, 51, size=6.6, color=MUTED)
    page_number(c, 2)
    c.showPage()


def page_3(c):
    c.setFillColor(CREAM)
    c.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
    kicker(c, "02 / من السوشيال ميديا إلى الشراء")
    ar_line(c, "الوصول لا يتحسن بمجرد زيادة النشر.", PAGE_W - 42, PAGE_H - 80,
            font="Arabic-Bold", size=24)
    ar_line(c, "بل عندما يكون لكل منشور دور واضح.", PAGE_W - 42, PAGE_H - 113,
            font="Arabic-Bold", size=24, color=BURGUNDY)
    ar_text(c,
            "الهدف ليس مجرد المشاهدات، بل جذب اهتمام مؤهل يصل إلى الساعة المناسبة ويكمل طريقه نحو الشراء.",
            PAGE_W - 43, PAGE_H - 140, 690, size=9, color=MUTED, leading=13)

    base.draw_image_fill(c, EVIDENCE / "evidence-instagram-reels-public.jpg",
                         42, 203, 365, 205, radius=13)
    base.rounded(c, 42, 163, 365, 45, 0, fill=BURGUNDY_DARK)
    ar_line(c, "مشاهدات الريلز الأخيرة الظاهرة  /  192  /  503  /  520", 392, 187,
            font="Arabic-Bold", size=7.8, color=CREAM)
    ar_line(c, "لقطات المنتجات مادة بصرية قوية؛ الفجوة هي في نظام التوزيع والتحويل.",
            392, 173, size=7, color=HexColor("#D8CBC6"))

    ar_line(c, "منظومة المحتوى المقترحة", 800, 423, font="Arabic-Bold", size=8.5)
    content_series(c, 618, 351, 182, "دليل جودة Clocky", "الجودة والفحص والضمان.", 1)
    content_series(c, 435, 351, 173, "على المعصم", "أشخاص، مقاسات وتنسيق.", 2)
    content_series(c, 618, 287, 182, "مدرسة الساعات", "تعليم مبسط ونصائح للعناية.", 3)
    content_series(c, 435, 287, 173, "اختر ساعتك", "مقارنة حسب الذوق والميزانية.", 4)
    content_series(c, 435, 223, 365, "إصدارات وعروض", "منتج واحد، قصة واحدة، وخطوة واضحة.", 5)

    base.rounded(c, 42, 69, PAGE_W - 84, 72, 12, fill=white, stroke=LINE)
    ar_line(c, "المسار القابل للشراء", PAGE_W - 58, 119,
            font="Arabic-Bold", size=7.5, color=BURGUNDY)
    steps = ["خطاف الريل", "إثبات المنتج", "تسوّق هذه الساعة", "صفحة المنتج", "واتساب / إتمام الطلب"]
    xs = [745, 624, 498, 355, 202]
    for index, (step, x) in enumerate(zip(steps, xs)):
        ar_line(c, step, x, 91, font="Arabic-Bold", size=7.2,
                color=GREEN if index == 4 else INK)
        if index < 4:
            c.setFillColor(GOLD)
            c.setFont("Arial-Bold", 11)
            c.drawString(x - 92, 89, "<")
    ar_line(c, "أعداد المشاهدات لقطة عامة في وقت محدد وقد تتغير مع استمرار عرض المحتوى.",
            PAGE_W - 42, 48, size=6.6, color=MUTED)
    page_number(c, 3)
    c.showPage()


def page_4(c):
    c.setFillColor(PAPER)
    c.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
    kicker(c, "03 / نقاط ضعف الموقع")
    ar_line(c, "المنتج ليس المشكلة.", PAGE_W - 42, PAGE_H - 80,
            font="Arabic-Bold", size=25)
    ar_line(c, "التجربة المحيطة به هي المشكلة.", PAGE_W - 42, PAGE_H - 114,
            font="Arabic-Bold", size=25, color=BURGUNDY)
    ar_text(c,
            "لدى Clocky منتجات قوية ومادة بصرية جيدة، لكن الرحلة الحالية تفقد الإحساس بالفخامة قبل أن يتحول الاهتمام إلى طلب.",
            PAGE_W - 43, PAGE_H - 142, 690, size=9.5, color=MUTED, leading=14)

    gap = 13
    card_w = (PAGE_W - 84 - gap) / 2
    pain_card(c, 42 + card_w + gap, 284, card_w, 137, 1, "العربية مترجمة لا مصممة بالعربية",
              "تتداخل اللغتان وتختلف صياغة أسماء المنتجات. المشتري الباحث عن تجربة راقية لا ينبغي أن يبذل جهداً لفهم المتجر.",
              "ثقة أقل", "الدليل 01")
    pain_card(c, 42, 284, card_w, 137, 2, "الفيديو لا يقود إلى المنتج",
              "قد تعجب العميل ساعة داخل فيديو، لكنه لا يستطيع الانتقال مباشرة إلى صفحتها. تتولد الرغبة ثم يتوقف المسار.",
              "ضياع نية الشراء", "الدليل 02")
    pain_card(c, 42 + card_w + gap, 130, card_w, 137, 3, "هيكل التصفح مشتت",
              "الأقسام وصفوف المنتجات وكتل المحتوى لا تصنع قصة بيع واحدة واضحة. العميل يتجول بدلاً من أن يتقدم.",
              "احتكاك أكبر", "الدليل 03")
    pain_card(c, 42, 130, card_w, 137, 4, "المنتجات الفاخرة تبدو عادية رقمياً",
              "المساحات والتدرج البصري وطريقة عرض المنتج لا تمنح كل ساعة ما يكفي من التركيز والإرشاد والقيمة المدركة.",
              "قيمة مدركة أقل", "الدليل 03")

    base.rounded(c, 42, 69, PAGE_W - 84, 48, 10, fill=BURGUNDY_DARK)
    ar_line(c, "05 / عدم استقرار الأداء", PAGE_W - 57, 98,
            font="Arabic-Bold", size=8, color=GOLD)
    ar_line(c, "تم رصد أكثر من 70 خطأ في وحدة التحكم، ما يزيد مخاطر البطء والتعطل وعدم دقة القياس.",
            PAGE_W - 57, 82, size=7.8, color=CREAM)
    ar_line(c, "الملاحظات مبنية على واجهة المتجر العامة فقط، من دون الوصول إلى التحليلات أو لوحة الإدارة.",
            PAGE_W - 42, 52, size=6.6, color=MUTED)
    page_number(c, 4)
    c.showPage()


def page_5(c):
    c.setFillColor(PAPER)
    c.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
    kicker(c, "04 / أدلة من الموقع الحالي")
    ar_line(c, "الفجوات واضحة داخل رحلة الشراء", PAGE_W - 42, PAGE_H - 80,
            font="Arabic-Bold", size=25)
    ar_line(c, "لقطات حقيقية من clockyeg.com/ar بتاريخ 14 سبتمبر 2026.",
            PAGE_W - 43, PAGE_H - 108, size=9, color=MUTED)

    shot_w, shot_h = 353, 192
    base.draw_image_fill(c, EVIDENCE / "evidence-arabic-mixed-crop.jpg",
                         42, 263, shot_w, shot_h, radius=12)
    base.rounded(c, 42, 227, shot_w, 43, 0, fill=BURGUNDY_DARK)
    ar_line(c, "الدليل 01 / العربية والإنجليزية في الصفحة نفسها", 382, 248,
            font="Arabic-Bold", size=8, color=CREAM)
    ar_line(c, "ما زالت عناوين وأسماء منتجات بالإنجليزية داخل النسخة العربية.",
            382, 235, size=7.1, color=HexColor("#D8CBC6"))

    base.draw_image_fill(c, EVIDENCE / "evidence-videos-crop.jpg",
                         414, 263, 386, shot_h, radius=12)
    base.rounded(c, 414, 227, 386, 43, 0, fill=BURGUNDY_DARK)
    ar_line(c, "الدليل 02 / الفيديوهات غير قابلة للشراء", 787, 248,
            font="Arabic-Bold", size=8, color=CREAM)
    ar_line(c, "صف الفيديو يعرض الساعات من دون رابط مباشر لكل منتج.",
            787, 235, size=7.1, color=HexColor("#D8CBC6"))

    base.draw_image_fill(c, EVIDENCE / "evidence-arabic-homepage.jpg",
                         42, 61, 265, 145, radius=12)
    base.rounded(c, 324, 61, 476, 145, 12, fill=white, stroke=LINE)
    ar_line(c, "الدليل 03 / قصة البيع موزعة", 781, 181,
            font="Arabic-Bold", size=8, color=BURGUNDY)
    ar_line(c, "عناصر جذابة، لكن من دون صالة عرض تقود العميل.", 781, 152,
            font="Arabic-Bold", size=14)
    ar_text(c,
            "الصورة الرئيسية وصفوف المنتجات الطويلة والمجموعات والعلامات ومنطقة الفيديو المنفصلة تتنافس على الانتباه. يرى العميل محتوى كثيراً، لكنه لا ينتقل في رحلة راقية مقصودة.",
            781, 126, 425, size=8.1, color=MUTED, leading=12)
    ar_line(c, "النتيجة: يتولد الاهتمام في مكان ويضيع قبل الخطوة التالية.", 781, 76,
            font="Arabic-Bold", size=7.3, color=BURGUNDY)
    page_number(c, 5)
    c.showPage()


def page_6(c):
    c.setFillColor(PAPER)
    c.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
    kicker(c, "05 / أدلة الأداء")
    ar_line(c, "المتجر يحمل عبئاً تقنياً واضحاً.", PAGE_W - 42, PAGE_H - 80,
            font="Arabic-Bold", size=25)
    ar_text(c,
            "التجربة الراقية يجب أن تبدو فورية ومنضبطة. نتائج الاختبار الحالية توضح فرصة مباشرة لتحسين السرعة واستقرار التشغيل.",
            PAGE_W - 43, PAGE_H - 108, 690, size=9.2, color=MUTED, leading=14)

    base.draw_image_fill(c, EVIDENCE / "evidence-pagespeed-mobile.png", 42, 302, 367, 160, radius=12)
    base.draw_image_fill(c, EVIDENCE / "evidence-pagespeed-desktop.png", 431, 302, 369, 160, radius=12)
    ar_pill(c, 55, 315, 130, "الهاتف / الأداء 60", size=7)
    ar_pill(c, 444, 315, 145, "سطح المكتب / الأداء 57", size=7)

    base.draw_image_fill(c, EVIDENCE / "evidence-runtime-errors.png", 42, 75, 420, 205, radius=12)
    base.rounded(c, 479, 75, 321, 205, 13, fill=white, stroke=LINE)
    ar_line(c, "الدليل 04 / أخطاء وقت التشغيل", 781, 256,
            font="Arabic-Bold", size=8, color=BURGUNDY)
    ar_line(c, "76 خطأ في وحدة التحكم", 781, 220, font="Arabic-Bold", size=22)
    ar_line(c, "كما سُجلت 7 مشكلات", 781, 198, font="Arabic", size=14, color=BURGUNDY)
    ar_text(c,
            "قد تؤخر أخطاء التشغيل تحميل الوسائط، وتعطل عناصر تفاعلية، وتربك القياس، وتجعل اختبار أي تطوير لاحق أكثر صعوبة.",
            781, 170, 285, size=8.1, color=MUTED, leading=12)
    base.rounded(c, 498, 95, 278, 49, 10, fill=HexColor("#EEF4EF"), stroke=HexColor("#CADBCE"))
    ar_line(c, "التتبع موجود", 764, 128, font="Arabic-Bold", size=7.6, color=GREEN)
    ar_line(c, "تم رصد بيكسل ميتا، وتؤكد إعدادات شوبيفاي تفعيل واجهة التحويلات.",
            764, 112, size=7.1, color=GREEN)
    ar_line(c, "نتائج PageSpeed ولقطة وحدة التحكم مقدمة بتاريخ 14 سبتمبر 2026، وقد تختلف الدرجات بين الاختبارات.",
            PAGE_W - 42, 53, size=6.4, color=MUTED)
    page_number(c, 6)
    c.showPage()


def page_7(c):
    c.setFillColor(INK)
    c.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
    kicker(c, "06 / تجربة السجادة الحمراء", color=GOLD)
    ar_line(c, "مشتري الساعة يجب أن يشعر أن هناك من يقوده،", PAGE_W - 42, PAGE_H - 80,
            font="Arabic-Bold", size=24, color=CREAM)
    ar_line(c, "لا أن يُترك للبحث وحده.", PAGE_W - 42, PAGE_H - 113,
            font="Arabic-Bold", size=24, color=GOLD)
    ar_text(c,
            "شراء الساعة قرار متأنٍ وفي سوق متخصص. يجب أن يبدو الموقع كصالة عرض خاصة: هادئة، واضحة، ومطمئنة في كل خطوة.",
            505, PAGE_H - 140, 450, size=9.2, color=HexColor("#CFC4BE"), leading=14)

    experience_step(c, 505, 369, 1, "الاستقبال",
                    "ترحيب عربي وإنجليزي واضح، مكتوب بطبيعية لكل عميل.")
    experience_step(c, 505, 307, 2, "صالة عرض منتقاة",
                    "تصفح حسب الذوق والمناسبة والميزانية ونوع الساعة، بضوضاء أقل واتجاه أوضح.")
    experience_step(c, 505, 237, 3, "قصة ساعة قابلة للشراء",
                    "كل فيديو يذكر اسم الساعة ويفتح صفحتها مباشرة عبر زر واضح: تسوّق هذه الساعة.")
    experience_step(c, 505, 167, 4, "مساحة الثقة",
                    "النوع والمواصفات والصور القريبة وآراء العملاء والشحن والاسترجاع والضمان بجوار قرار الشراء.")
    experience_step(c, 505, 93, 5, "إتمام طلب بخدمة شخصية",
                    "إتمام بسيط ودعم واتساب واضح يجعل الخطوة الأخيرة سهلة وشخصية.")

    base.draw_image_fill(c, ASSETS / "cabe2596b3b741e2.png", 560, 82, 240, 378, radius=17,
                         tint=(INK, 0.18))
    c.setStrokeColor(GOLD)
    c.setLineWidth(1.2)
    c.roundRect(560, 82, 240, 378, 17, fill=0, stroke=1)
    base.rounded(c, 578, 100, 204, 72, 12, fill=HexColor("#191616"), stroke=GOLD)
    ar_line(c, "مبدأ التجربة", 764, 149, font="Arabic-Bold", size=7.5, color=GOLD)
    ar_line(c, "ساعة واحدة. قصة واحدة.", 764, 125, font="Arabic-Bold", size=13.5, color=CREAM)
    ar_line(c, "خطوة تالية بلا مجهود.", 764, 108, font="Arabic-Bold", size=13.5, color=CREAM)
    page_number(c, 7, dark=True)
    c.showPage()


def page_8(c):
    c.setFillColor(PAPER)
    c.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
    kicker(c, "07 / تنفيذ مركز")
    ar_line(c, "أصلح رحلة الشراء أولاً.", PAGE_W - 42, PAGE_H - 80,
            font="Arabic-Bold", size=25)
    ar_line(c, "من دون إعادة بناء غير ضرورية.", PAGE_W - 42, PAGE_H - 113,
            font="Arabic-Bold", size=25, color=BURGUNDY)
    ar_text(c,
            "خطة أربعة أسابيع تركز على النقاط الأكثر تأثيراً في الوضوح والثقة ونية الشراء.",
            PAGE_W - 43, PAGE_H - 140, 690, size=9.4, color=MUTED, leading=13)

    gap = 12
    w = (PAGE_W - 84 - gap * 3) / 4
    phase_card(c, 42 + 3 * (w + gap), 247, w, 1, "الرسم وتحديد الأولويات",
               "مراجعة السوشيال والموقع معاً، ثم ترتيب كل مشكلة حسب أثرها على المبيعات والجهد والأولوية.",
               "خريطة واحدة للرحلة المتكاملة")
    phase_card(c, 42 + 2 * (w + gap), 247, w, 2, "تصميم المنظومة",
               "إنشاء سلاسل المحتوى، وهيكل متجر ثنائي اللغة، واتجاه واضح لصفحات المنتجات الراقية.",
               "منظومة موحدة للمحتوى والتجربة")
    phase_card(c, 42 + w + gap, 247, w, 3, "الربط والبناء",
               "ربط الريلز وفيديوهات الموقع بالساعات نفسها، ثم وضع عناصر الثقة بجوار كل قرار شراء.",
               "رحلة محتوى قابلة للشراء")
    phase_card(c, 42, 247, w, 4, "الاختبار والإطلاق",
               "اختبار الهاتف والعربية والأداء وأحداث التتبع، ثم الإطلاق وقياس أول دورة.",
               "إصدار أول قابل للقياس")

    base.rounded(c, 42, 74, PAGE_W - 84, 142, 14, fill=BURGUNDY_DARK)
    ar_line(c, "المرحلة الأولى", PAGE_W - 62, 186, font="Arabic-Bold", size=8, color=GOLD)
    ar_line(c, "حوّل كل لحظة اهتمام إلى خطوة تالية سهلة.", PAGE_W - 62, 151,
            font="Arabic-Bold", size=20, color=CREAM)
    ar_text(c,
            "سيعيد فريقنا تصميم المسار من الوصول إلى اكتشاف المنتج ثم الشراء، مع الحفاظ على نقاط القوة الحالية للعلامة.",
            PAGE_W - 62, 120, 600, size=8.8, color=HexColor("#D8CBC6"), leading=14)
    ar_pill(c, 58, 98, 195, "التالي: جلسة تحديد الأولويات والنطاق",
            fill=CREAM, fg=BURGUNDY_DARK, size=7.2)
    ar_line(c, "تم جمع الأدلة من واجهة المتجر العامة بتاريخ 14 سبتمبر 2026. يتحدد النطاق النهائي بعد مراجعة التحليلات والإدارة.",
            PAGE_W - 42, 51, size=6.4, color=MUTED)
    page_number(c, 8)
    c.showPage()


def page_9(c):
    c.setFillColor(PAPER)
    c.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
    base.rounded(c, 42, PAGE_H - 78, 36, 46, 7, fill=BURGUNDY_DARK)
    draw_logo_icon(c, 49, PAGE_H - 73, 22, 36)
    kicker(c, "08 / نموذج أثر المبيعات")
    ar_line(c, "حل نقاط الضعف يرفع أداء المسار بالكامل.", PAGE_W - 42, PAGE_H - 80,
            font="Arabic-Bold", size=24)
    ar_text(c,
            "النتيجة ليست تحسيناً بصرياً منعزلاً، بل زيارات أكثر تأهلاً، واهتماماً أقل هدراً، وفرصة أعلى لتحويل كل زيارة إلى طلب.",
            PAGE_W - 43, PAGE_H - 108, 720, size=9.1, color=MUTED, leading=13.5)

    gap = 10
    fw = (PAGE_W - 84 - gap * 4) / 5
    funnel_card(c, 42 + 4 * (fw + gap), 375, fw, 1, "وصول اجتماعي أقوى", "زيارات مؤهلة أكثر")
    funnel_card(c, 42 + 3 * (fw + gap), 375, fw, 2, "فيديوهات قابلة للشراء", "مشاهدات منتجات أكثر")
    funnel_card(c, 42 + 2 * (fw + gap), 375, fw, 3, "تعريب راقٍ", "ثقة أعلى لدى المشتري")
    funnel_card(c, 42 + fw + gap, 375, fw, 4, "موقع أسرع وأكثر استقراراً", "تسرب أقل")
    funnel_card(c, 42, 375, fw, 5, "إثبات واضح ودعوة للشراء", "طلبات مكتملة أكثر")

    base.rounded(c, 42, 105, PAGE_W - 84, 238, 14, fill=white, stroke=LINE)
    c.setFillColor(BURGUNDY_DARK)
    c.roundRect(42, 299, PAGE_W - 84, 44, 14, fill=1, stroke=0)
    c.rect(42, 299, PAGE_W - 84, 22, fill=1, stroke=0)
    ar_line(c, "نموذج مبيعات توضيحي / لكل 10,000 زيارة مؤهلة", PAGE_W - 59, 316,
            font="Arabic-Bold", size=8, color=CREAM)

    columns = [782, 660, 520, 365, 174]
    headers = ["السيناريو", "التحويل", "الطلبات", "الإيراد عند متوسط طلب 4,000 جنيه", "التحسن"]
    for x, header in zip(columns, headers):
        ar_line(c, header, x, 277, font="Arabic-Bold", size=6.8, color=MUTED)

    rows = [
        ("الخط الأساسي المفترض", "0.8%", "80", "320,000 جنيه", "-"),
        ("تحسن محافظ", "1.0%", "100", "400,000 جنيه", "+25%"),
        ("تحسن قوي", "1.2%", "120", "480,000 جنيه", "+50%"),
    ]
    row_ys = [240, 201, 162]
    for idx, (row, y) in enumerate(zip(rows, row_ys)):
        if idx > 0:
            c.setFillColor(HexColor("#F4F7F3"))
            c.rect(52, y - 13, PAGE_W - 104, 32, fill=1, stroke=0)
        fonts = ["Arabic-Bold" if idx else "Arabic", "Arial-Bold" if idx else "Arial",
                 "Arial-Bold" if idx else "Arial", "Arabic-Bold" if idx else "Arabic",
                 "Arial-Bold" if idx else "Arial"]
        for x, value, font in zip(columns, row, fonts):
            if font.startswith("Arabic"):
                ar_line(c, value, x, y, font=font, size=8)
            else:
                c.setFillColor(INK)
                c.setFont(font, 8.2)
                c.drawRightString(x, y, value)
        c.setStrokeColor(LINE)
        c.setLineWidth(0.5)
        c.line(52, y - 16, PAGE_W - 52, y - 16)

    ar_line(c, "ماذا يعني ذلك", PAGE_W - 59, 125,
            font="Arabic-Bold", size=8, color=BURGUNDY)
    ar_line(c, "النتيجة: 40 طلباً إضافياً لكل 10,000 زيارة إذا ارتفع التحويل من 0.8% إلى 1.2%.",
            PAGE_W - 164, 122, font="Arabic-Bold", size=11.5)

    base.rounded(c, 42, 61, PAGE_W - 84, 30, 8, fill=BURGUNDY_DARK)
    c.setFont("Arabic-Bold", 7.4)
    c.setFillColor(CREAM)
    c.drawCentredString(PAGE_W / 2, 72,
                        shape("وأي نمو في الزيارات المؤهلة من السوشيال ميديا يضاف فوق تحسن التحويل."))
    ar_line(c,
            "سيناريو توضيحي وليس ضماناً. تُستبدل الافتراضات ببيانات المتجر الفعلية قبل أي تخطيط مالي.",
            PAGE_W - 42, 43, size=6.4, color=MUTED)
    page_number(c, 9)
    c.showPage()


def build():
    base.prepare_evidence()
    prepare_logo_icon()
    OUT.parent.mkdir(parents=True, exist_ok=True)
    c = canvas.Canvas(str(OUT), pagesize=(PAGE_W, PAGE_H))
    c.setTitle("Clocky Digital Experience Proposal - Arabic")
    c.setAuthor("FAYSAL Studio")
    c.setSubject("Arabic digital experience and growth proposal for Clocky EGY")
    for fn in (page_1, page_2, page_3, page_4, page_5, page_6, page_7, page_8, page_9):
        fn(c)
    c.save()
    print(OUT)


if __name__ == "__main__":
    build()
