import os
import string
import sys
from datetime import datetime
from random import choice

from fpdf import FPDF


class Certificate:
    """
    Generator of hearing range certificates.
    Requires name, and lower and upper boundaries.
    """

    chars = string.ascii_lowercase + string.ascii_uppercase + string.digits

    def __init__(self, username, low, high):
        self.id = "".join(choice(self.chars) for _ in range(16))
        self.username = username
        self.low = low
        self.high = high
        self.filename = f"{self.username.replace(' ', '-').lower()}-{self.id}.pdf"
        self.path = os.path.realpath(self.filename)

    def generate(self):
        pdf = FPDF(orientation="P", unit="pt", format="A4")
        pdf.add_page()

        # add icons
        pdf.image(name="icon.jpg", w=50, h=50, x=30, y=30)
        pdf.image(name="icon.jpg", w=50, h=50, x=515, y=30)
        pdf.image(name="icon.jpg", w=50, h=50, x=30, y=750)
        pdf.image(name="icon.jpg", w=50, h=50, x=515, y=750)

        # insert title
        pdf.set_font(family="Helvetica", size=36, style="B")
        pdf.cell(w=0, h=130, border=0, align="C", ln=1)
        pdf.cell(w=0, h=40, txt="CERTIFICATE", border=0, align="C", ln=1)
        pdf.cell(w=0, h=60, border=0, align="C", ln=1)

        # insert user name
        pdf.set_font(family="Times", size=24, style="I")
        pdf.cell(w=0, h=30, txt="This is to certify that", border=0, align="C", ln=1)
        pdf.cell(w=0, h=40, border=0, align="C", ln=1)
        pdf.set_font(family="Times", size=32, style="B")
        pdf.cell(w=0, h=40, txt=f"{self.username}", border=0, align="C", ln=1)
        pdf.cell(w=0, h=40, border=0, align="C", ln=1)

        # insert results
        pdf.set_font(family="Times", size=24, style="I")
        pdf.cell(
            w=0,
            h=30,
            txt="has completed an online hearing test",
            border=0,
            align="C",
            ln=1,
        )
        pdf.cell(
            w=0, h=30, txt="with the following results:", border=0, align="C", ln=1
        )
        pdf.cell(w=0, h=50, border=0, align="C", ln=1)

        # insert table head
        pdf.set_font(family="Times", size=24, style="B")
        pdf.cell(w=270, h=30, txt="Lower frequency limit", border=0, align="C")
        pdf.cell(w=270, h=30, txt="Upper frequency limit", border=0, align="C", ln=1)
        pdf.cell(w=0, h=5, border=0, align="C", ln=1)

        # insert frequency values
        pdf.set_font(family="Times", size=24)
        pdf.cell(w=270, h=40, txt=f"{self.low} Hz", border=0, align="C")
        pdf.cell(w=270, h=40, txt=f"{self.high} Hz", border=0, align="C", ln=1)
        pdf.cell(w=0, h=50, border=0, align="C", ln=1)

        # insert footer
        pdf.set_font(family="Times", size=24, style="U")
        pdf.cell(w=0, h=30, txt="Date issued:", border=0, align="C", ln=1)
        pdf.cell(w=0, h=5, border=0, align="C", ln=1)
        pdf.set_font(family="Times", size=24)
        pdf.cell(
            w=0,
            h=30,
            txt=datetime.now().strftime("%d/%m/%Y"),
            border=0,
            align="C",
            ln=1,
        )
        pdf.cell(w=0, h=30, border=0, align="C", ln=1)

        # save report to file
        pdf.output(name=self.filename)


if __name__ == "__main__":
    report = Certificate(sys.argv[1], sys.argv[2], sys.argv[3])
    report.generate()
    print(report.filename, flush=True)
