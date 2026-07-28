#!/usr/bin/env python3
# Generates 1200x630 Open Graph cards in the site's own typefaces and palette.
from PIL import Image, ImageDraw, ImageFont
import os

W, H = 1200, 630
OUT = '/Users/alecmark/Documents/GitHub/aip-website/og'
SCRATCH = os.path.dirname(os.path.abspath(__file__))

KOWHAI = (232, 169, 58)
PAPER  = (244, 247, 241)
MUTED  = (168, 190, 178)

def font(path, size, wght=None):
    f = ImageFont.truetype(os.path.join(SCRATCH, path), size)
    if wght is not None:
        try: f.set_variation_by_axes([wght])
        except Exception: pass
    return f

def gradient(c0, c1):
    base = Image.new('RGB', (W, H), c0)
    top = Image.new('RGB', (W, H), c1)
    mask = Image.new('L', (W, H))
    md = mask.load()
    for y in range(H):
        for x in range(0, W, 4):
            v = int(255 * min(1.0, (x / W * 0.55 + y / H * 0.75)))
            for dx in range(4):
                if x + dx < W: md[x + dx, y] = v
    base.paste(top, (0, 0), mask)
    return base

def grid(img, alpha=10, step=38):
    ov = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    d = ImageDraw.Draw(ov)
    for x in range(0, W, step): d.line([(x, 0), (x, H)], fill=(244, 247, 241, alpha))
    for y in range(0, H, step): d.line([(0, y), (W, y)], fill=(244, 247, 241, alpha))
    return Image.alpha_composite(img.convert('RGBA'), ov).convert('RGB')

def wrap(d, text, f, maxw):
    words, lines, cur = text.split(), [], ''
    for w in words:
        t = (cur + ' ' + w).strip()
        if d.textlength(t, font=f) <= maxw: cur = t
        else:
            if cur: lines.append(cur)
            cur = w
    if cur: lines.append(cur)
    return lines

def mark(d, x, y, s=44):
    d.rounded_rectangle([x, y, x + s, y + s], radius=14, fill=(31, 93, 76))
    d.ellipse([x + s*0.30, y + s*0.30, x + s*0.62, y + s*0.62], outline=PAPER, width=3)
    d.ellipse([x + s*0.58, y + s*0.50, x + s*0.74, y + s*0.66], fill=KOWHAI)

def card(name, headline, sub, stats, c0=(15, 28, 24), c1=(31, 93, 76)):
    img = grid(gradient(c0, c1))
    d = ImageDraw.Draw(img)

    f_brand = font('inter.ttf', 20, 700)
    f_head  = font('jakarta.ttf', 76, 800)
    f_sub   = font('inter.ttf', 27, 400)
    f_val   = font('jakarta.ttf', 34, 800)
    f_lab   = font('inter.ttf', 17, 500)

    mark(d, 80, 64)
    d.text((140, 74), 'AOTEAROA INTELLIGENCE PARTY', font=f_brand, fill=(255, 255, 255))
    d.text((140, 100), 'CANDIDATE RELEASE 1.4.0', font=font('inter.ttf', 16, 500), fill=MUTED)

    # Fit the headline to at most two lines, then centre the headline+sub block
    # in the space between the brand lockup and the stats rule.
    size = 76
    while size > 50:
        f_head = font('jakarta.ttf', size, 800)
        lines = wrap(d, headline, f_head, W - 160)
        if len(lines) <= 2: break
        size -= 4
    lh = int(size * 1.13)

    sub_lines = wrap(d, sub, f_sub, W - 190)[:2] if sub else []
    block = len(lines) * lh + (14 + len(sub_lines) * 38 if sub_lines else 0)
    TOP, BOT = 168, H - 156
    y = TOP + max(0, (BOT - TOP - block) // 2)

    for ln in lines:
        d.text((80, y), ln, font=f_head, fill=(255, 255, 255)); y += lh
    if sub_lines:
        y += 14
        for ln in sub_lines:
            d.text((80, y), ln, font=f_sub, fill=MUTED); y += 38

    d.line([(80, H - 132), (W - 80, H - 132)], fill=(244, 247, 241, 40), width=1)
    if stats:
        x = 80
        for val, lab in stats:
            d.text((x, H - 108), val, font=f_val, fill=KOWHAI)
            d.text((x, H - 62), lab.upper(), font=f_lab, fill=MUTED)
            x += max(d.textlength(val, font=f_val), d.textlength(lab.upper(), font=f_lab)) + 68

    path = os.path.join(OUT, name + '.png')
    img.save(path, 'PNG', optimize=True)
    print(f'{name+".png":<20} {os.path.getsize(path)//1024:>4} KB')

os.makedirs(OUT, exist_ok=True)

card('index', 'Government, compiled for Aotearoa.',
     'We believe New Zealand should be run the way a frontier AI model is built.',
     [('2028', 'Hallucination neutral'), ('18.4M L', 'Cooling water / day'), ('0', 'Corporate dinners')])

card('policies', 'Fourteen policies for an exponential Aotearoa.',
     'Each plank ships with a minister model, an evaluation metric, and its known limitations.',
     [('14', 'Planks'), ('1 day', 'Consent turnaround'), ('0.4 pts', 'Residual disparity')])

card('ministers', 'Model cards for ministerial systems.',
     'One orchestrator, fourteen specialist models, and every limitation published.',
     [('15', 'Models'), ('10T', 'Target parameters'), ('Locked', 'Te Tiriti route')])

card('electorates', 'A model card for the place you live.',
     'Every electorate runs a regional checkpoint, documented like a minister model.',
     [('71', 'Electorates'), ('10', 'Cards published'), ('71 / 71', 'MPs retained')])

card('playground', 'Ask the Cabinet directly.',
     'Select a minister model, read its operating instructions, and put a question to it.',
     [('15', 'Models'), ('8', 'Determinations'), ('3', 'Locked constraints')])

card('research', 'Everything we know, including what counts against it.',
     'Seven reports, one retracted, and a contamination audit we published rather than retrained.',
     [('94%', 'Eval set in corpus'), ('97.1 → 58.3', 'Te Tiriti Alignment'), ('0', 'External citations')])

card('status', 'Government operations are normal.',
     'Live operational dashboard for the public beta.',
     [('99.99%', 'Cabinet uptime'), ('22 ms', 'Median latency'), ('14', 'Bills compiling')])

card('incidents', 'Every degradation, written down.',
     'Blameless postmortems, published within five working days, with the action items tracked.',
     [('41', 'Postmortems'), ('2h 14m', 'Time to resolution'), ('34%', 'Public found first')])

card('store', 'Merchandise for the release candidate.',
     'For supporters who prefer their democracy in soft cotton and deterministic typography.',
     [('$24.99', 'Born pre-trained'), ('$29.99', 'sudo vote-for-me')])
