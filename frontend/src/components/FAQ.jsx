import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

const FAQ_LIST = [
  {
    id: "faq-1",
    question: "Apa itu ResignAjaDulu?",
    answer: "ResignAjaDulu adalah aplikasi web cerdas yang membantu kamu mengambil keputusan resign secara terukur, bukan impulsif. Kami menggabungkan analisis karier berbasis AI dan kalkulator finansial untuk memberikan gambaran objektif tentang kesiapanmu."
  },
  {
    id: "faq-2",
    question: "Bagaimana cara kerja analisis karier?",
    answer: "Kami menggunakan model Deep Learning berbasis IBM HR Attrition Dataset yang dilatih untuk memprediksi probabilitas seseorang akan resign berdasarkan data demografi, masa kerja, kepuasan kerja, dan kondisi lingkungan kantor."
  },
  {
    id: "faq-3",
    question: "Apakah data saya aman?",
    answer: "Ya. Data yang kamu masukkan hanya digunakan untuk kalkulasi analisis dan disimpan di akun pribadimu. Kami tidak membagikan data apapun ke pihak ketiga."
  },
  {
    id: "faq-4",
    question: "Berapa akurat prediksi AI-nya?",
    answer: "Model AI kami mencapai akurasi minimal 90% dengan F1-score di atas 0.75 berdasarkan evaluasi pada dataset validasi. Namun tetap ingat, hasil ini bersifat prediktif dan bukan keputusan final."
  },
  {
    id: "faq-5",
    question: "Apa itu Skor Finansial?",
    answer: "Skor Finansial (0-100) mengukur seberapa siap kamu secara finansial jika resign hari ini. Dihitung dari tabungan, pengeluaran bulanan, cicilan, status asuransi, prospek kerja baru, dan ada tidaknya side hustle."
  },
  {
    id: "faq-6",
    question: "Apakah saya harus login untuk menggunakan aplikasi?",
    answer: "Ya, kamu perlu login untuk mengakses fitur analisis dan menyimpan riwayat. Daftar gratis hanya butuh nama, email, dan password."
  },
];

export default function FAQ() {
  return (
    <section id="faq" className="w-full max-w-3xl mx-auto px-6 py-16">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-black text-text-main tracking-tight mb-2">
            <span className="text-primary">FAQ</span>
        </h2>
        <p className="text-text-main/50 font-medium text-sm">Semua yang perlu kamu tahu tentang ResignAjaDulu</p>
      </div>

      <Accordion type="single" collapsible className="flex flex-col gap-3">
        {FAQ_LIST.map((item) => (
          <AccordionItem key={item.id} value={item.id}>
            <AccordionTrigger>
              <p className="font-bold text-text-main text-sm">{item.question}</p>
            </AccordionTrigger>
            <AccordionContent>
              <p className="text-sm text-text-main/70 font-medium leading-relaxed">{item.answer}</p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}