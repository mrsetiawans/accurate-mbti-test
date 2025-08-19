// Deklarasi variabel state global
let currentStage = 'welcome'; // 'welcome', 'test', 'results'
let scores = {
    EI: 0, // Extraversion/Introversion
    SN: 0, // Sensing/Intuition
    TF: 0, // Thinking/Feeling
    JP: 0, // Judging/Perceiving
    AT: 0  // Assertive/Turbulent
};
let mbtiTypeResult = '';
let currentQuestionIndex = 0;
let shuffledQuestions = [];
let userName = ''; // Variabel untuk menyimpan nama pengguna

// Daftar pertanyaan yang komprehensif untuk setiap dikotomi (40 pertanyaan per dikotomi)
const allQuestions = [
    // Extraversion vs. Introversion (E/I) - positive score leans E, negative leans I
    { id: 'ei1', text: 'Saya merasa bersemangat dan energik setelah menghabiskan waktu di keramaian sosial atau pesta.', dichotomy: 'EI' },
    { id: 'ei2', text: 'Saya lebih suka berinteraksi secara mendalam dengan beberapa orang daripada berinteraksi secara luas dengan banyak orang.', dichotomy: 'EI', reverseScore: true },
    { id: 'ei3', text: 'Saya cenderung berbicara untuk memikirkan ide-ide saya.', dichotomy: 'EI' },
    { id: 'ei4', text: 'Waktu sendiri dan refleksi mendalam adalah cara terbaik bagi saya untuk mengisi ulang energi.', dichotomy: 'EI', reverseScore: true },
    { id: 'ei5', text: 'Saya mudah bosan jika terlalu lama sendirian tanpa interaksi sosial.', dichotomy: 'EI' },
    { id: 'ei6', text: 'Saya cenderung menjadi pendengar yang baik dan sering membutuhkan waktu untuk memproses pikiran saya sebelum berbicara.', dichotomy: 'EI', reverseScore: true },
    { id: 'ei7', text: 'Saya sering menjadi orang pertama yang memulai percakapan atau aktivitas dalam kelompok.', dichotomy: 'EI' },
    { id: 'ei8', text: 'Saya lebih suka bekerja sendirian atau dalam kelompok kecil yang akrab.', dichotomy: 'EI', reverseScore: true },
    { id: 'ei9', text: 'Saya merasa nyaman berada di pusat perhatian dalam situasi sosial.', dichotomy: 'EI' },
    { id: 'ei10', text: 'Saya lebih suka menghabiskan malam yang tenang di rumah daripada pergi keluar.', dichotomy: 'EI', reverseScore: true },
    { id: 'ei11', text: 'Saya cenderung berinteraksi dengan mudah dengan orang asing.', dichotomy: 'EI' },
    { id: 'ei12', text: 'Saya mempertimbangkan pilihan saya dengan hati-hati sebelum mengemukakannya kepada orang lain.', dichotomy: 'EI', reverseScore: true },
    { id: 'ei13', text: 'Saya menikmati kegiatan yang melibatkan banyak orang dan interaksi konstan.', dichotomy: 'EI' },
    { id: 'ei14', text: 'Saya merasa lelah setelah terlalu banyak interaksi sosial.', dichotomy: 'EI', reverseScore: true },
    { id: 'ei15', text: 'Saya mendapatkan energi dari dunia luar dan orang-orang.', dichotomy: 'EI' },
    { id: 'ei16', text: 'Saya sering mencari stimulasi dari lingkungan luar dan interaksi aktif.', dichotomy: 'EI' },
    { id: 'ei17', text: 'Saya menikmati kesendirian untuk merenung dan mengisi ulang baterai mental saya.', dichotomy: 'EI', reverseScore: true },
    { id: 'ei18', text: 'Dalam percakapan, saya cenderung mengambil peran yang lebih aktif.', dichotomy: 'EI' },
    { id: 'ei19', text: 'Saya sering merasa canggung atau tidak nyaman dalam kelompok besar orang yang tidak saya kenal.', dichotomy: 'EI', reverseScore: true },
    { id: 'ei20', text: 'Saya lebih suka menulis daripada berbicara ketika menyampaikan ide-ide kompleks.', dichotomy: 'EI', reverseScore: true },
    { id: 'ei21', text: 'Saya lebih suka merencanakan kegiatan sosial saya jauh-jauh hari.', dichotomy: 'EI' },
    { id: 'ei22', text: 'Saya sering merasa lelah setelah berada di sekitar banyak orang untuk waktu yang lama.', dichotomy: 'EI', reverseScore: true },
    { id: 'ei23', text: 'Saya cenderung mengekspresikan pikiran saya dengan lantang saat memproses informasi.', dichotomy: 'EI' },
    { id: 'ei24', text: 'Saya lebih suka bekerja secara mandiri tanpa banyak gangguan.', dichotomy: 'EI', reverseScore: true },
    { id: 'ei25', text: 'Saya merasa paling nyaman di keramaian atau acara besar.', dichotomy: 'EI' },
    { id: 'ei26', text: 'Saya menikmati percakapan satu lawan satu yang mendalam lebih dari obrolan kelompok.', dichotomy: 'EI', reverseScore: true },
    { id: 'ei27', text: 'Saya sering menjadi inisiator dalam aktivitas kelompok.', dichotomy: 'EI' },
    { id: 'ei28', text: 'Saya butuh waktu sendirian untuk mengisi ulang energi setelah bersosialisasi.', dichotomy: 'EI', reverseScore: true },
    { id: 'ei29', text: 'Saya mudah beradaptasi dengan lingkungan sosial baru.', dichotomy: 'EI' },
    { id: 'ei30', text: 'Saya memilih untuk merayakan pencapaian pribadi secara tenang, bukan di depan umum.', dichotomy: 'EI', reverseScore: true },
    { id: 'ei31', text: 'Saya merasa lebih hidup ketika terlibat dalam banyak kegiatan sosial.', dichotomy: 'EI' },
    { id: 'ei32', text: 'Saya menghindari panggilan telepon dan lebih suka mengirim pesan teks atau email.', dichotomy: 'EI', reverseScore: true },
    { id: 'ei33', text: 'Saya suka menjadi bagian dari tim yang dinamis dan interaktif.', dichotomy: 'EI' },
    { id: 'ei34', text: 'Saya sering merasa kehabisan kata-kata dalam kelompok besar.', dichotomy: 'EI', reverseScore: true },
    { id: 'ei35', text: 'Saya cenderung mencari petualangan dan stimulasi eksternal.', dichotomy: 'EI' },
    { id: 'ei36', text: 'Saya menemukan kedamaian dalam keheningan dan kesendirian.', dichotomy: 'EI', reverseScore: true },
    { id: 'ei37', text: 'Saya suka menjadi pusat perhatian.', dichotomy: 'EI' },
    { id: 'ei38', text: 'Saya merasa tidak nyaman ketika orang lain terlalu banyak tahu tentang kehidupan pribadi saya.', dichotomy: 'EI', reverseScore: true },
    { id: 'ei39', text: 'Saya memiliki banyak kenalan daripada beberapa teman dekat.', dichotomy: 'EI' },
    { id: 'ei40', text: 'Saya lebih suka merenung dan menulis jurnal daripada berbicara tentang masalah saya.', dichotomy: 'EI', reverseScore: true },

    // Sensing vs. Intuition (S/N) - positive score leans S, negative leans N
    { id: 'sn1', text: 'Saya cenderung memperhatikan fakta, detail konkret, dan apa yang ada di depan mata.', dichotomy: 'SN' },
    { id: 'sn2', text: 'Saya lebih tertarik pada kemungkinan masa depan, pola, dan ide-ide abstrak daripada realitas saat ini.', dichotomy: 'SN', reverseScore: true },
    { id: 'sn3', text: 'Saya mengandalkan pengalaman praktis saya daripada teori atau konsep yang belum teruji.', dichotomy: 'SN' },
    { id: 'sn4', text: 'Saya senang membayangkan berbagai kemungkinan dan sering mencari makna tersembunyi di balik sesuatu.', dichotomy: 'SN', reverseScore: true },
    { id: 'sn5', text: 'Saya lebih suka instruksi yang jelas, langkah demi langkah, daripada petunjuk yang umum atau abstrak.', dichotomy: 'SN' },
    { id: 'sn6', text: 'Saya sering terpaku pada gambaran besar dan terkadang mengabaikan detail-detail kecil.', dichotomy: 'SN', reverseScore: true },
    { id: 'sn7', text: 'Saya sangat realistis dan praktis dalam pendekatan saya terhadap kehidupan.', dichotomy: 'SN' },
    { id: 'sn8', text: 'Saya senang memecahkan masalah dengan ide-ide baru dan inovatif daripada metode yang sudah ada.', dichotomy: 'SN', reverseScore: true },
    { id: 'sn9', text: 'Saya menikmati bekerja dengan data dan informasi yang konkret dan terukur.', dichotomy: 'SN' },
    { id: 'sn10', text: 'Saya sering melihat makna dan hubungan di antara berbagai hal yang mungkin tidak terlihat jelas bagi orang lain.', dichotomy: 'SN', reverseScore: true },
    { id: 'sn11', text: 'Saya lebih fokus pada "apa yang" daripada "bagaimana jika".', dichotomy: 'SN' },
    { id: 'sn12', text: 'Saya tertarik pada teori dan konsep abstrak, bahkan jika tidak ada aplikasi praktis langsung.', dichotomy: 'SN', reverseScore: true },
    { id: 'sn13', text: 'Saya lebih suka mempelajari hal-hal baru melalui pengalaman langsung dan praktik.', dichotomy: 'SN' },
    { id: 'sn14', text: 'Saya senang berpikir tentang masa depan dan kemungkinan yang tak terbatas.', dichotomy: 'SN', reverseScore: true },
    { id: 'sn15', text: 'Saya cenderung memperhatikan detail kecil yang mungkin dilewatkan orang lain.', dichotomy: 'SN' },
    { id: 'sn16', text: 'Saya lebih suka deskripsi yang jelas dan literal daripada metafora atau kiasan.', dichotomy: 'SN' },
    { id: 'sn17', text: 'Saya sering mendapatkan wawasan melalui pola dan hubungan yang abstrak.', dichotomy: 'SN', reverseScore: true },
    { id: 'sn18', text: 'Saya tertarik pada hal-hal yang dapat saya lihat, dengar, sentuh, rasakan, dan cium.', dichotomy: 'SN' },
    { id: 'sn19', text: 'Saya lebih suka berimajinasi tentang bagaimana hal-hal bisa terjadi daripada fokus pada bagaimana hal itu terjadi.', dichotomy: 'SN', reverseScore: true },
    { id: 'sn20', text: 'Saya cenderung memercayai apa yang dapat dibuktikan dan diamati.', dichotomy: 'SN' },
    { id: 'sn21', text: 'Saya cenderung berfokus pada apa yang nyata dan konkret di sekitar saya.', dichotomy: 'SN' },
    { id: 'sn22', text: 'Saya sering tertarik pada ide-ide baru dan abstrak, bahkan jika itu tidak praktis.', dichotomy: 'SN', reverseScore: true },
    { id: 'sn23', text: 'Saya lebih suka detail dan fakta daripada konsep umum.', dichotomy: 'SN' },
    { id: 'sn24', text: 'Saya cenderung melihat gambaran besar dan pola di balik peristiwa.', dichotomy: 'SN', reverseScore: true },
    { id: 'sn25', text: 'Saya mengandalkan pengalaman masa lalu untuk memecahkan masalah.', dichotomy: 'SN' },
    { id: 'sn26', text: 'Saya suka berinovasi dan mencari cara-cara baru untuk melakukan sesuatu.', dichotomy: 'SN', reverseScore: true },
    { id: 'sn27', text: 'Saya menikmati aktivitas yang melibatkan penggunaan indra saya (misalnya, memasak, berkebun).', dichotomy: 'SN' },
    { id: 'sn28', text: 'Saya sering memimpikan masa depan dan kemungkinan yang belum terjadi.', dichotomy: 'SN', reverseScore: true },
    { id: 'sn29', text: 'Saya menghargai instruksi yang jelas dan langkah-langkah yang terdefinisi.', dichotomy: 'SN' },
    { id: 'sn30', text: 'Saya bisa melihat berbagai interpretasi dalam sebuah cerita atau situasi.', dichotomy: 'SN', reverseScore: true },
    { id: 'sn31', text: 'Saya lebih suka hal-hal yang sudah terbukti dan dapat diandalkan.', dichotomy: 'SN' },
    { id: 'sn32', text: 'Saya sering mengikuti intuisi saya daripada fakta-fakta yang ada.', dichotomy: 'SN', reverseScore: true },
    { id: 'sn33', text: 'Saya fokus pada masa kini dan apa yang perlu dilakukan sekarang.', dichotomy: 'SN' },
    { id: 'sn34', text: 'Saya senang mendiskusikan teori dan filosofi.', dichotomy: 'SN', reverseScore: true },
    { id: 'sn35', text: 'Saya cenderung praktis dan realistis dalam pendekatan saya.', dichotomy: 'SN' },
    { id: 'sn36', text: 'Saya sering menemukan makna tersembunyi atau simbolisme dalam hal-hal.', dichotomy: 'SN', reverseScore: true },
    { id: 'sn37', text: 'Saya menghargai tradisi dan metode yang telah teruji.', dichotomy: 'SN' },
    { id: 'sn38', text: 'Saya sering memiliki "firasat" tentang sesuatu.', dichotomy: 'SN', reverseScore: true },
    { id: 'sn39', text: 'Saya percaya pada data dan bukti konkret.', dichotomy: 'SN' },
    { id: 'sn40', text: 'Saya lebih suka bekerja dengan konsep dan ide daripada objek fisik.', dichotomy: 'SN', reverseScore: true },

    // Thinking vs. Feeling (T/F) - positive score leans T, negative leans F
    { id: 'tf1', text: 'Ketika membuat keputusan penting, saya mengutamakan logika, objektivitas, dan analisis sistematis.', dichotomy: 'TF' },
    { id: 'tf2', text: 'Saya mempertimbangkan dampak keputusan saya terhadap perasaan orang lain dan berusaha menjaga harmoni.', dichotomy: 'TF', reverseScore: true },
    { id: 'tf3', text: 'Saya lebih menghargai keadilan dan konsistensi daripada belas kasihan atau empati dalam situasi sulit.', dichotomy: 'TF' },
    { id: 'tf4', text: 'Saya cenderung membuat keputusan berdasarkan nilai-nilai pribadi dan apa yang saya rasakan benar.', dichotomy: 'TF', reverseScore: true },
    { id: 'tf5', text: 'Saya bisa bersikap kritis secara objektif jika diperlukan, bahkan jika itu mungkin menyinggung perasaan seseorang.', dichotomy: 'TF' },
    { id: 'tf6', text: 'Saya merasa tidak nyaman saat harus menyampaikan kritik yang keras kepada orang lain.', dichotomy: 'TF', reverseScore: true },
    { id: 'tf7', text: 'Saya yakin bahwa keputusan terbaik adalah yang paling rasional, bukan yang paling populer.', dichotomy: 'TF' },
    { id: 'tf8', text: 'Saya adalah orang yang sangat suportif dan berusaha memahami perspektif emosional orang lain.', dichotomy: 'TF', reverseScore: true },
    { id: 'tf9', text: 'Saya mencari kebenaran dan keadilan di atas segalanya.', dichotomy: 'TF' },
    { id: 'tf10', text: 'Saya mudah berempati dengan masalah orang lain dan merasa sedih ketika mereka sedih.', dichotomy: 'TF', reverseScore: true },
    { id: 'tf11', text: 'Saya cenderung mendekati masalah dengan kepala dingin dan analisis logis.', dichotomy: 'TF' },
    { id: 'tf12', text: 'Saya berusaha menghindari konflik dan menjaga suasana hati yang baik.', dichotomy: 'TF', reverseScore: true },
    { id: 'tf13', text: 'Saya menghargai objektivitas dan standar yang jelas dalam semua hal.', dichotomy: 'TF' },
    { id: 'tf14', text: 'Saya sering mengambil keputusan berdasarkan apa yang terasa benar di hati saya.', dichotomy: 'TF', reverseScore: true },
    { id: 'tf15', text: 'Saya bisa memisahkan emosi dari fakta saat membuat keputusan.', dichotomy: 'TF' },
    { id: 'tf16', text: 'Saya lebih termotivasi oleh pencapaian logis dan efisiensi.', dichotomy: 'TF' },
    { id: 'tf17', text: 'Saya cenderung memprioritaskan nilai-nilai pribadi dan hubungan harmonis.', dichotomy: 'TF', reverseScore: true },
    { id: 'tf18', text: 'Saya dapat membuat keputusan sulit yang tidak populer jika itu logis dan benar.', dichotomy: 'TF' },
    { id: 'tf19', text: 'Saya khawatir tentang bagaimana keputusan saya akan memengaruhi orang lain secara emosional.', dichotomy: 'TF', reverseScore: true },
    { id: 'tf20', text: 'Saya menganggap kepepekaan perasaan penting dalam interaksi sehari-hari.', dichotomy: 'TF', reverseScore: true },
    { id: 'tf21', text: 'Saya cenderung mengambil keputusan berdasarkan analisis logis dan objektivitas.', dichotomy: 'TF' },
    { id: 'tf22', text: 'Saya mempertimbangkan bagaimana keputusan saya akan mempengaruhi hubungan dan perasaan orang lain.', dichotomy: 'TF', reverseScore: true },
    { id: 'tf23', text: 'Saya lebih suka keadilan dan prinsip di atas pertimbangan pribadi.', dichotomy: 'TF' },
    { id: 'tf24', text: 'Saya didorong oleh nilai-nilai pribadi dan keinginan untuk menjaga harmoni.', dichotomy: 'TF', reverseScore: true },
    { id: 'tf25', text: 'Saya bisa bersikap langsung dan terus terang, bahkan jika itu bisa menyinggung.', dichotomy: 'TF' },
    { id: 'tf26', text: 'Saya berusaha untuk tidak menyakiti perasaan orang lain.', dichotomy: 'TF', reverseScore: true },
    { id: 'tf27', text: 'Saya mencari konsistensi dan objektivitas dalam semua argumen.', dichotomy: 'TF' },
    { id: 'tf28', text: 'Saya mudah berempati dan ingin membantu orang yang kesulitan.', dichotomy: 'TF', reverseScore: true },
    { id: 'tf29', text: 'Saya bangga pada kemampuan saya untuk tetap tenang dan rasional di bawah tekanan.', dichotomy: 'TF' },
    { id: 'tf30', text: 'Saya sangat peka terhadap kritik dan konflik.', dichotomy: 'TF', reverseScore: true },
    { id: 'tf31', text: 'Saya menghargai logika di atas emosi saat berhadapan dengan masalah.', dichotomy: 'TF' },
    { id: 'tf32', text: 'Saya sering membuat keputusan yang "terasa benar" di hati saya.', dichotomy: 'TF', reverseScore: true },
    { id: 'tf33', text: 'Saya menganalisis pro dan kontra secara cermat sebelum memutuskan.', dichotomy: 'TF' },
    { id: 'tf34', text: 'Saya akan mengorbankan efisiensi untuk menjaga suasana hati yang baik di antara tim.', dichotomy: 'TF', reverseScore: true },
    { id: 'tf35', text: 'Saya memprioritaskan efisiensi dan hasil.', dichotomy: 'TF' },
    { id: 'tf36', text: 'Saya termotivasi oleh dukungan dan apresiasi dari orang lain.', dichotomy: 'TF', reverseScore: true },
    { id: 'tf37', text: 'Saya dapat menyampaikan kritik secara objektif tanpa melibatkan emosi.', dichotomy: 'TF' },
    { id: 'tf38', text: 'Saya akan menghindari konfrontasi untuk menjaga perdamaian.', dichotomy: 'TF', reverseScore: true },
    { id: 'tf39', text: 'Saya percaya bahwa kebenaran, betapapun pahitnya, harus selalu diungkapkan.', dichotomy: 'TF' },
    { id: 'tf40', text: 'Saya lebih fokus pada dampak sosial dan pribadi dari keputusan.', dichotomy: 'TF', reverseScore: true },

    // Judging vs. Perceiving (J/P) - positive score leans J, negative leans P
    { id: 'jp1', text: 'Saya lebih suka memiliki rencana yang jelas dan terstruktur serta menaatinya.', dichotomy: 'JP' },
    { id: 'jp2', text: 'Saya cenderung fleksibel dan spontan, suka membiarkan pilihan tetap terbuka.', dichotomy: 'JP', reverseScore: true },
    { id: 'jp3', text: 'Saya merasa lebih nyaman ketika tugas dan proyek diselesaikan jauh sebelum batas waktu.', dichotomy: 'JP' },
    { id: 'jp4', text: 'Saya sering menunggu hingga menit terakhir untuk menyelesaikan sesuatu, memberikan saya lebih banyak pilihan.', dichotomy: 'JP', reverseScore: true },
    { id: 'jp5', text: 'Saya suka membuat keputusan dengan cepat dan menyelesaikannya agar saya bisa melanjutkan ke hal berikutnya.', dichotomy: 'JP' },
    { id: 'jp6', text: 'Saya menikmati proses pengumpulan informasi dan menunda keputusan sampai saya memiliki semua fakta.', dichotomy: 'JP', reverseScore: true },
    { id: 'jp7', text: 'Saya merasa cemas jika ada hal-hal yang tidak terencana atau mendadak mengubah jadwal saya.', dichotomy: 'JP' },
    { id: 'jp8', text: 'Saya suka beradaptasi dengan situasi yang berubah daripada berpegang teguh pada rencana awal.', dichotomy: 'JP', reverseScore: true },
    { id: 'jp9', text: 'Saya merasa lebih baik ketika segala sesuatu teratur dan terencana.', dichotomy: 'JP' },
    { id: 'jp10', text: 'Saya menikmati kebebasan untuk mengikuti arus dan mengubah rencana saya kapan saja.', dichotomy: 'JP', reverseScore: true },
    { id: 'jp11', text: 'Saya lebih suka daftar tugas dan mencentang item yang sudah selesai.', dichotomy: 'JP' },
    { id: 'jp12', text: 'Saya cenderung menunda pengambilan keputusan hingga benar-benar perlu.', dichotomy: 'JP', reverseScore: true },
    { id: 'jp13', text: 'Saya merasa puas setelah menyelesaikan suatu proyek atau tugas.', dichotomy: 'JP' },
    { id: 'jp14', text: 'Saya suka menjaga opsi saya tetap terbuka dan tidak terlalu cepat berkomitmen.', dichotomy: 'JP', reverseScore: true },
    { id: 'jp15', text: 'Saya menghargai struktur dan prediksi dalam kehidupan saya sehari-hari.', dichotomy: 'JP' },
    { id: 'jp16', text: 'Saya suka memiliki jadwal dan menaatinya sebisa mungkin.', dichotomy: 'JP' },
    { id: 'jp17', text: 'Saya sering menunda memulai tugas sampai inspirasi datang.', dichotomy: 'JP', reverseScore: true },
    { id: 'jp18', text: 'Saya lebih suka membuat keputusan akhir secepat mungkin.', dichotomy: 'JP' },
    { id: 'jp19', text: 'Saya tidak keberatan jika rencana berubah di saat-saat terakhir.', dichotomy: 'JP', reverseScore: true },
    { id: 'jp20', text: 'Saya merasa lebih produktif ketika memiliki tenggat waktu yang jelas.', dichotomy: 'JP' },
    { id: 'jp21', text: 'Saya merasa lebih baik ketika jadwal saya terencana dan terorganisir.', dichotomy: 'JP' },
    { id: 'jp22', text: 'Saya lebih suka spontanitas dan membiarkan hal-hal terjadi secara alami.', dichotomy: 'JP', reverseScore: true },
    { id: 'jp23', text: 'Saya suka membuat daftar dan mencentang tugas yang sudah selesai.', dichotomy: 'JP' },
    { id: 'jp24', text: 'Saya sering menunda pekerjaan sampai tenggat waktu mendekat.', dichotomy: 'JP', reverseScore: true },
    { id: 'jp25', text: 'Saya merasa cemas jika ada terlalu banyak ketidakpastian.', dichotomy: 'JP' },
    { id: 'jp26', text: 'Saya menikmati fleksibilitas untuk mengubah rencana kapan saja.', dichotomy: 'JP', reverseScore: true },
    { id: 'jp27', text: 'Saya suka menyelesaikan sesuatu dan melanjutkan ke tugas berikutnya.', dichotomy: 'JP' },
    { id: 'jp28', text: 'Saya senang mengumpulkan informasi sebanyak mungkin sebelum membuat keputusan.', dichotomy: 'JP', reverseScore: true },
    { id: 'jp29', text: 'Saya menghargai struktur dan ketertiban.', dichotomy: 'JP' },
    { id: 'jp30', text: 'Saya cenderung menjaga pilihan saya tetap terbuka selama mungkin.', dichotomy: 'JP', reverseScore: true },
    { id: 'jp31', text: 'Saya adalah orang yang sangat disiplin dan teratur.', dichotomy: 'JP' },
    { id: 'jp32', text: 'Saya sering menemukan bahwa saya bekerja paling baik di bawah tekanan menit terakhir.', dichotomy: 'JP', reverseScore: true },
    { id: 'jp33', text: 'Saya merencanakan jauh-jauh hari untuk liburan atau acara penting.', dichotomy: 'JP' },
    { id: 'jp34', text: 'Saya lebih suka melakukan perjalanan tanpa rencana yang ketat.', dichotomy: 'JP', reverseScore: true },
    { id: 'jp35', text: 'Saya merasa lega setelah suatu keputusan dibuat.', dichotomy: 'JP' },
    { id: 'jp36', text: 'Saya menikmati proses eksplorasi dan tidak terburu-buru untuk menyimpulkan.', dichotomy: 'JP', reverseScore: true },
    { id: 'jp37', text: 'Saya suka memiliki rutinitas harian yang konsisten.', dichotomy: 'JP' },
    { id: 'jp38', text: 'Saya mudah beradaptasi dengan perubahan yang tidak terduga.', dichotomy: 'JP', reverseScore: true },
    { id: 'jp39', text: 'Saya merasa nyaman dengan tenggat waktu yang ketat.', dichotomy: 'JP' },
    { id: 'jp40', text: 'Saya lebih suka bekerja dalam lingkungan yang santai dan tidak terikat.', dichotomy: 'JP', reverseScore: true },

    // Assertive vs. Turbulent (A/T) - positive score leans A, negative leans T
    { id: 'at1', text: 'Saya cenderung tetap tenang dan percaya diri bahkan dalam situasi yang penuh tekanan.', dichotomy: 'AT' },
    { id: 'at2', text: 'Saya sering khawatir tentang bagaimana orang lain memandang saya atau pekerjaan saya.', dichotomy: 'AT', reverseScore: true },
    { id: 'at3', text: 'Saya tidak terlalu memikirkan kegagalan atau kesalahan yang pernah saya buat.', dichotomy: 'AT' },
    { id: 'at4', text: 'Saya cenderung perfeksionis dan merasa tidak puas jika sesuatu tidak sempurna.', dichotomy: 'AT', reverseScore: true },
    { id: 'at5', text: 'Saya yakin dengan keputusan saya sendiri dan tidak mudah terpengaruh oleh kritik.', dichotomy: 'AT' },
    { id: 'at6', text: 'Saya sering meragukan diri sendiri atau kemampuan saya.', dichotomy: 'AT', reverseScore: true },
    { id: 'at7', text: 'Saya mudah bangkit kembali setelah mengalami kemunduran atau kekecewaan.', dichotomy: 'AT' },
    { id: 'at8', text: 'Saya cenderung merasakan emosi dengan sangat intens, baik positif maupun negatif.', dichotomy: 'AT', reverseScore: true },
    { id: 'at9', text: 'Saya merasa nyaman dengan diri saya sendiri dan jarang membandingkan diri dengan orang lain.', dichotomy: 'AT' },
    { id: 'at10', text: 'Saya sering mencari validasi atau pujian dari orang lain.', dichotomy: 'AT', reverseScore: true },
    { id: 'at11', text: 'Saya memiliki pandangan yang optimis dan positif terhadap masa depan.', dichotomy: 'AT' },
    { id: 'at12', text: 'Saya bisa menjadi sangat kritis terhadap diri sendiri.', dichotomy: 'AT', reverseScore: true },
    { id: 'at13', text: 'Saya merasa mandiri dan tidak terlalu membutuhkan dukungan emosional dari orang lain.', dichotomy: 'AT' },
    { id: 'at14', text: 'Saya mudah stres atau cemas saat menghadapi ketidakpastian.', dichotomy: 'AT', reverseScore: true },
    { id: 'at15', text: 'Saya cenderung menerima diri sendiri apa adanya, dengan segala kekurangan.', dichotomy: 'AT' },
    { id: 'at16', text: 'Saya sering merasa perlu untuk membuktikan diri kepada orang lain.', dichotomy: 'AT', reverseScore: true },
    { id: 'at17', text: 'Saya dapat dengan mudah mengabaikan komentar negatif atau kritik yang tidak membangun.', dichotomy: 'AT' },
    { id: 'at18', text: 'Saya memiliki kecenderungan untuk menganalisis terlalu banyak atau merenungkan hal-hal secara berlebihan.', dichotomy: 'AT', reverseScore: true },
    { id: 'at19', text: 'Saya merasa percaya diri dalam kemampuan saya untuk mengatasi tantangan.', dichotomy: 'AT' },
    { id: 'at20', text: 'Saya sangat peka terhadap suasana hati atau perasaan orang di sekitar saya.', dichotomy: 'AT', reverseScore: true },
    { id: 'at21', text: 'Saya umumnya merasa puas dengan diri sendiri dan pencapaian saya.', dichotomy: 'AT' },
    { id: 'at22', text: 'Saya sering merasa tidak cukup baik atau meragukan kemampuan saya.', dichotomy: 'AT', reverseScore: true },
    { id: 'at23', text: 'Saya mudah pulih dari kemunduran.', dichotomy: 'AT' },
    { id: 'at24', text: 'Saya cenderung mengkhawatirkan hal-hal kecil.', dichotomy: 'AT', reverseScore: true },
    { id: 'at25', text: 'Saya tidak terlalu memedulikan pendapat orang lain tentang saya.', dichotomy: 'AT' },
    { id: 'at26', text: 'Saya mencari persetujuan dari orang lain untuk merasa aman.', dichotomy: 'AT', reverseScore: true },
    { id: 'at27', text: 'Saya percaya diri dalam mengambil risiko yang diperhitungkan.', dichotomy: 'AT' },
    { id: 'at28', text: 'Saya cenderung perfeksionis dan takut membuat kesalahan.', dichotomy: 'AT', reverseScore: true },
    { id: 'at29', text: 'Saya merasa tenang dan stabil secara emosional.', dichotomy: 'AT' },
    { id: 'at30', text: 'Saya mudah stres dan cemas.', dichotomy: 'AT', reverseScore: true },
    { id: 'at31', text: 'Saya jarang membandingkan diri saya dengan orang lain.', dichotomy: 'AT' },
    { id: 'at32', text: 'Saya sering merasa perlu untuk membuktikan diri saya.', dichotomy: 'AT', reverseScore: true },
    { id: 'at33', text: 'Saya memiliki pandangan optimis tentang masa depan.', dichotomy: 'AT' },
    { id: 'at34', text: 'Saya cenderung fokus pada potensi kegagalan.', dichotomy: 'AT', reverseScore: true },
    { id: 'at35', text: 'Saya menerima diri sendiri dengan segala kekurangan.', dichotomy: 'AT' },
    { id: 'at36', text: 'Saya sangat peka terhadap bagaimana orang lain memandang saya.', dichotomy: 'AT', reverseScore: true },
    { id: 'at37', text: 'Saya merasa kuat dan tangguh dalam menghadapi tantangan.', dichotomy: 'AT' },
    { id: 'at38', text: 'Saya sering merenungkan kesalahan masa lalu.', dichotomy: 'AT', reverseScore: true },
    { id: 'at39', text: 'Saya tidak mudah terpengaruh oleh kritik negatif.', dichotomy: 'AT' },
    { id: 'at40', text: 'Saya membutuhkan validasi eksternal untuk merasa percaya diri.', dichotomy: 'AT', reverseScore: true },
];

// Opsi untuk skala 3 poin, dengan skor yang sesuai (bobot lebih tinggi)
const likertOptions = [
    { text: 'Setuju', score: 2 },        // Increased score
    { text: 'Netral', score: 0 },
    { text: 'Tidak Setuju', score: -2 },    // Increased score (negative)
];

// Deskripsi Tipe MBTI yang komprehensif untuk semua 32 tipe (termasuk A/T)
const mbtiDescriptions = {
    // ---- ISTJ Variants ----
    ISTJ_A: {
        name: 'Ahli Logistik yang Tegas',
        description: `Halo [NamaPengguna], selamat! Kamu adalah seorang ISTJ-A, sang Ahli Logistik yang Tegas. Ini berarti kamu adalah individu yang sangat bertanggung jawab, praktis, dan logis, dengan rasa percaya diri yang kuat. Kamu menghargai ketertiban, struktur, dan keandalan di atas segalanya. Kamu punya fokus yang tajam pada fakta dan detail, serta membuat keputusan berdasarkan logika dan pengalaman yang sudah terbukti, tanpa banyak terpengaruh keraguan diri dari dalam maupun pandangan orang lain. Kamu tipe yang bisa diandalkan, kan?

                <strong>Kekuatanmu yang Bersinar:</strong> Kamu sangat andal, fokus pada detail sekecil apa pun, punya integritas yang tinggi, dan tetap tenang meskipun di bawah tekanan. Efisiensimu luar biasa, dan kamu selalu menyelesaikan tugas dengan sangat teliti. Kamu memang pilar yang kokoh!

                <strong>Area untuk Terus Bertumbuh:</strong> Terkadang kamu mungkin cenderung sedikit kaku atau kurang fleksibel terhadap perubahan. Ada kalanya kamu bisa terlalu kritis, baik terhadap diri sendiri maupun orang lain, jika standar tinggimu tidak terpenuhi. Jangan terlalu keras pada diri sendiri, ya!

                <strong>Gayamu dalam Berinteraksi Sosial:</strong> Kamu mungkin terlihat pendiam, tapi bicaramu lugas dan langsung ke intinya. Kamu hanya akan berbicara jika ada sesuatu yang penting untuk dikatakan, dan kamu sangat menghargai kejujuran. Lingkaran pertemananmu mungkin kecil, tapi sangat setia, karena kamu membangun hubungan yang dalam.

                <strong>Caramu Bekerja:</strong> Kamu adalah pekerja keras yang sistematis dan metodis. Kamu akan unggul di lingkungan yang terstruktur, di mana aturan dan prosedur jelas. Mengelola proyek dan menjaga ketertiban adalah keahlianmu yang tak tertandingi.

                <strong>Kehidupan Pribadimu:</strong> Kamu konsisten, bisa diandalkan, dan sangat setia kepada orang-orang terdekatmu. Kamu memprioritaskan kewajiban dan tanggung jawab, menemukan kenyamanan dalam rutinitas dan keteraturan. Emosi tidak mudah menggoyahkanmu, karena kamu punya pondasi yang kuat. Salut!`,
    },
    ISTJ_T: {
        name: 'Ahli Logistik yang Bergejolak',
        description: `Hai [NamaPengguna]! Hasilmu adalah ISTJ-T, si Ahli Logistik yang Bergejolak. Kamu adalah individu yang praktis, logis, dan bertanggung jawab, sama seperti ISTJ lainnya. Namun, kamu mungkin lebih rentan terhadap keraguan diri dan tekanan. Meskipun kamu sangat menghargai ketertiban, kamu cenderung lebih cemas tentang bagaimana kinerjamu dan bagaimana orang lain memandangmu.

                <strong>Kekuatanmu yang Bersinar:</strong> Kamu sangat andal, bahkan lebih teliti dari yang lain, karena ada dorongan internal yang kuat untuk terus memperbaiki diri dan mencapai kesempurnaan. Kamu sangat hati-hati karena tidak ingin membuat kesalahan.

                <strong>Area untuk Terus Bertumbuh:</strong> Kamu mungkin terlalu kritis terhadap diri sendiri dan mudah merasa stres. Kamu mungkin membutuhkan lebih banyak validasi atau pengakuan dari luar. Terkadang, kamu bisa terjebak dalam detail dan sulit melepaskan kekhawatiran. Ingat, tidak ada yang sempurna!

                <strong>Gayamu dalam Berinteraksi Sosial:</strong> Kamu bisa lebih tertutup karena khawatir akan penilaian orang lain. Meskipun setia kepada teman-temanmu, kamu mungkin butuh jaminan dari mereka.

                <strong>Caramu Bekerja:</strong> Kamu sangat rajin dan teliti, seringkali bekerja ekstra untuk memastikan setiap pekerjaan sempurna. Namun, kamu mungkin merasa tertekan oleh tenggat waktu dan takut akan kegagalan.

                <strong>Kehidupan Pribadimu:</strong> Di balik eksterior yang tenang, kamu sering berjuang dengan kecemasan internal. Kamu mencari stabilitas dan kepastian, tetapi terkadang sulit menemukan ketenangan pikiran. Cobalah untuk lebih menerima dirimu apa adanya, ya!`,
    },
    // ---- ISFJ Variants ----
    ISFJ_A: {
        name: 'Sang Pembela yang Tegas',
        description: `Halo [NamaPengguna], selamat! Kamu adalah seorang ISFJ-A, sang Pembela yang Tegas. Kamu adalah individu yang hangat, bertanggung jawab, dan teliti dengan rasa percaya diri yang kuat. Kamu sangat setia dan fokus pada melayani orang lain, serta menjaga harmoni dalam lingkunganmu. Kamu sering menjadi pilar dukungan yang kokoh bagi komunitasmu tanpa banyak terpengaruh kritik.

                <strong>Kekuatanmu yang Bersinar:</strong> Kamu sangat peduli, bisa diandalkan, berorientasi pada detail, dan punya komitmen yang teguh. Kamu hebat dalam menerima kritik dengan kepala dingin dan tidak terlalu terpaku pada pendapat orang lain.

                <strong>Area untuk Terus Bertumbuh:</strong> Terkadang, kamu cenderung memprioritaskan kebutuhan orang lain di atas kebutuhanmu sendiri, yang bisa membuatmu sulit menolak permintaan. Kamu juga mungkin cenderung menghindari konflik. Ingat, kebutuhanmu juga penting!

                <strong>Gayamu dalam Berinteraksi Sosial:</strong> Kamu ramah dan sangat mendukung. Kamu adalah pendengar yang baik dan sering menawarkan bantuan praktis kepada siapa pun yang membutuhkan. Kamu membangun hubungan yang kuat dan langgeng dengan orang-orang di sekitarmu.

                <strong>Caramu Bekerja:</strong> Kamu adalah pekerja keras yang teliti dan berdedikasi. Kamu akan unggul dalam peran yang membutuhkan perhatian terhadap detail dan pelayanan yang tulus, seperti di bidang perawatan kesehatan atau pendidikan.

                <strong>Kehidupan Pribadimu:</strong> Kamu setia dan cenderung tradisional. Kamu menciptakan lingkungan yang stabil dan nyaman bagi orang-orang yang kamu cintai. Kamu menemukan kepuasan sejati dalam membantu dan mendukung keluarga serta teman-temanmu.`,
    },
    ISFJ_T: {
        name: 'Sang Pembela yang Bergejolak',
        description: `Hai [NamaPengguna]! Hasilmu adalah ISFJ-T, si Pembela yang Bergejolak. Kamu adalah individu yang hangat, bertanggung jawab, dan teliti, sama seperti ISFJ lainnya. Namun, kamu lebih peka terhadap perasaan dan kritik, serta cenderung lebih berhati-hati. Kamu sangat ingin membantu orang lain tetapi mungkin berjuang dengan keraguan diri dan kecemasan tentang apakah kamu sudah cukup baik.

                <strong>Kekuatanmu yang Bersinar:</strong> Kamu sangat berempati, peduli, dan teliti. Ada dorongan kuat dalam dirimu untuk terus memberikan yang terbaik. Kamu sangat responsif terhadap kebutuhan orang lain.

                <strong>Area untuk Terus Bertumbuh:</strong> Kamu mudah merasa bersalah, cenderung terlalu menganalisis situasi, dan mungkin membutuhkan validasi lebih sering. Kamu bisa rentan terhadap stres karena kekhawatiran. Cobalah untuk sedikit rileks, ya!

                <strong>Gayamu dalam Berinteraksi Sosial:</strong> Kamu sangat perhatian dan peka terhadap suasana hati orang lain. Kamu mungkin ragu untuk mengambil risiko sosial atau mengungkapkan kebutuhanmu sendiri karena khawatir akan reaksi orang lain.

                <strong>Caramu Bekerja:</strong> Kamu sangat berdedikasi dan perfeksionis, memastikan semua tugas dilakukan dengan benar. Namun, kamu mungkin merasa terbebani oleh tekanan dan takut mengecewakan orang lain.

                <strong>Kehidupan Pribadimu:</strong> Kamu berusaha keras menciptakan harmoni dan dukungan bagi orang-orang terdekatmu, tetapi mungkin berjuang dengan kecemasan internal tentang apakah kamu sudah melakukan cukup. Kamu mencari jaminan dan penerimaan dari lingkunganmu.`,
    },
    // ---- INFJ Variants ----
    INFJ_A: {
        name: 'Sang Advokat yang Tegas',
        description: `Selamat [NamaPengguna]! Kamu adalah seorang INFJ-A, sang Advokat yang Tegas. Kamu adalah individu yang idealistik, berwawasan, dan berprinsip, dengan rasa diri yang sangat kuat. Kamu didorong oleh nilai-nilai yang kokoh dan keinginan tulus untuk membuat perbedaan positif di dunia ini, tanpa terlalu terpengaruh oleh opini negatif atau keraguan diri. Kamu punya misi dalam hidup ini!

                <strong>Kekuatanmu yang Bersinar:</strong> Kamu sangat berwawasan, penuh empati, seorang visioner sejati, dan memiliki keyakinan yang teguh pada apa yang kamu yakini. Kamu mampu tetap tenang dan fokus pada tujuan jangka panjangmu, bahkan saat keadaan sulit.

                <strong>Area untuk Terus Bertumbuh:</strong> Terkadang kamu bisa terlalu idealis, yang mungkin membuatmu sulit menerima realitas yang tidak sejalan dengan visimu. Ada kalanya kamu terlalu menjaga diri dan sulit membuka sepenuhnya. Cobalah untuk sedikit lebih fleksibel, ya!

                <strong>Gayamu dalam Berinteraksi Sosial:</strong> Kamu punya pemahaman yang mendalam tentang sifat manusia. Kamu sering terlihat tenang dan ramah, namun sangat selektif dalam memilih teman. Kamu mencari koneksi yang bermakna dan dalam, bukan sekadar basa-basi.

                <strong>Caramu Bekerja:</strong> Kamu adalah pekerja keras yang sangat termotivasi oleh tujuan dan nilai-nilai luhur. Kamu akan unggul dalam peran yang memungkinkanmu untuk menginspirasi perubahan positif, seperti di bidang konseling, menulis, atau aktivisme sosial.

                <strong>Kehidupan Pribadimu:</strong> Kamu mencari makna dan tujuan dalam segala hal yang kamu lakukan. Kamu adalah individu yang reflektif dan sangat pribadi, yang menemukan kepuasan sejati dalam pertumbuhan diri dan melayani orang lain secara mendalam. Jiwamu penuh dengan aspirasi yang indah!`,
    },
    INFJ_T: {
        name: 'Sang Advokat yang Bergejolak',
        description: `Hai [NamaPengguna]! Hasilmu adalah INFJ-T, si Advokat yang Bergejolak. Kamu adalah individu yang idealistik, berwawasan, dan berprinsip, sama seperti INFJ lainnya. Namun, kamu lebih peka terhadap kritik dan cenderung lebih cemas tentang apakah kamu memenuhi potensi besarmu. Kamu punya keinginan kuat untuk membantu, tetapi mungkin berjuang dengan keraguan diri dan kekhawatiran yang mendalam.

                <strong>Kekuatanmu yang Bersinar:</strong> Kamu sangat berempati, punya wawasan yang luas, dan sangat berdedikasi pada tujuan mulia yang kamu yakini. Ada dorongan besar dalam dirimu untuk terus memperbaiki diri dan membuat dunia menjadi tempat yang lebih baik.

                <strong>Area untuk Terus Bertumbuh:</strong> Kamu mudah merasa stres dan rentan terhadap kritik. Kamu bisa terlalu keras pada diri sendiri, dan bisa terjebak dalam kekhawatiran tentang masa depan atau ketidaksempurnaan. Ingat, perjalanan itu lebih penting daripada kesempurnaan.

                <strong>Gayamu dalam Berinteraksi Sosial:</strong> Kamu sangat perhatian terhadap perasaan orang lain dan berusaha keras menghindari konflik. Kamu mungkin membutuhkan jaminan lebih sering dan berhati-hati dalam membuka diri sepenuhnya karena takut dihakimi.

                <strong>Caramu Bekerja:</strong> Kamu berdedikasi dan etis, bekerja dengan hati dan pikiranmu. Namun, kamu mungkin mengalami tekanan batin yang signifikan untuk mencapai kesempurnaan dalam pekerjaanmu, yang kadang membuatmu merasa lelah.

                <strong>Kehidupan Pribadimu:</strong> Kamu sangat introspektif dan selalu mencari makna yang mendalam dalam hidup. Kamu berjuang dengan kecemasan internal untuk memenuhi standar tinggi yang kamu tetapkan untuk diri sendiri, dan ingin memastikan semua tindakanmu selaras dengan nilai-nilai luhurmu. Kamu memang pribadi yang dalam!`,
    },
    // ---- INTJ Variants ----
    INTJ_A: {
        name: 'Sang Arsitek yang Tegas',
        description: `Selamat [NamaPengguna]! Kamu adalah seorang INTJ-A, sang Arsitek yang Tegas. Kamu adalah individu yang strategis, inovatif, dan mandiri, dengan kepercayaan diri yang teguh. Kamu punya pemikiran yang mendalam dan selalu fokus pada perencanaan jangka panjang serta menciptakan sistem yang sangat efisien. Kamu tidak banyak terpengaruh oleh keraguan diri atau pendapat orang lain, karena kamu tahu apa yang kamu inginkan.

                <strong>Kekuatanmu yang Bersinar:</strong> Kamu sangat cerdas, visioner, logis, tegas, dan mandiri. Kamu punya kemampuan luar biasa untuk melihat gambaran besar dan merencanakan masa depan dengan presisi yang mengejutkan.

                <strong>Area untuk Terus Bertumbuh:</strong> Terkadang kamu bisa terlihat kaku atau kurang peka terhadap emosi orang lain, yang mungkin membuatmu terkesan dingin atau arogan. Ada kalanya kamu mengabaikan detail kecil dalam kehidupan sehari-hari karena terlalu fokus pada hal besar. Cobalah untuk sedikit lebih membumi, ya!

                <strong>Gayamu dalam Berinteraksi Sosial:</strong> Kamu lebih suka diskusi intelektual yang merangsang daripada obrolan ringan. Kamu sangat menghargai kecerdasan dan kompetensi, dan mungkin terlihat menyendiri, tapi itu karena kamu lebih suka kualitas daripada kuantitas.

                <strong>Caramu Bekerja:</strong> Kamu adalah pemikir strategis yang unggul dalam pemecahan masalah kompleks dan perencanaan jangka panjang. Kamu adalah pemimpin alami yang sangat efisien dan selalu fokus pada hasil akhir.

                <strong>Kehidupan Pribadimu:</strong> Kamu selalu mendorong dirimu sendiri untuk terus belajar dan bertumbuh. Kamu sangat menghargai kemandirian dan rasionalitas, selalu mencari pengetahuan dan penguasaan dalam berbagai bidang. Pikiranmu adalah istanamu, dan kamu selalu membangunnya dengan cermat!`,
    },
    INTJ_T: {
        name: 'Sang Arsitek yang Bergejolak',
        description: `Hai [NamaPengguna]! Hasilmu adalah INTJ-T, si Arsitek yang Bergejolak. Kamu adalah individu yang strategis, inovatif, dan mandiri, sama seperti INTJ lainnya. Namun, kamu lebih rentan terhadap keraguan diri dan tekanan. Kamu punya keinginan kuat untuk mencapai keunggulan, tetapi mungkin lebih cemas tentang apakah kamu memenuhi standar tinggi yang kamu tetapkan untuk diri sendiri.

                <strong>Kekuatanmu yang Bersinar:</strong> Kamu sangat analitis dan punya dorongan kuat untuk terus meningkatkan diri. Kamu bisa sangat teliti dalam pekerjaanmu karena takut membuat kesalahan, yang justru membuat hasilmu luar biasa detail.

                <strong>Area untuk Terus Bertumbuh:</strong> Kamu cenderung terlalu kritis terhadap diri sendiri dan mudah merasa stres di bawah tekanan. Kamu mungkin lebih sensitif terhadap kritik, dan bisa terjebak dalam analisis berlebihan yang membuatmu sulit bergerak maju. Cobalah untuk lebih percaya pada dirimu sendiri!

                <strong>Gayamu dalam Berinteraksi Sosial:</strong> Kamu mungkin lebih menarik diri karena kekhawatiran akan penilaian atau untuk menghindari situasi yang tidak efisien. Kamu mencari validasi atas ide-ide cemerlangmu dari orang lain.

                <strong>Caramu Bekerja:</strong> Kamu adalah pemikir yang sangat teliti dan berdedikasi, seringkali bekerja ekstra untuk memastikan solusi yang kamu hasilkan sempurna. Namun, kamu mungkin merasa terbebani oleh ekspektasi (terutama dari dirimu sendiri!) dan takut akan kegagalan.

                <strong>Kehidupan Pribadimu:</strong> Kamu berusaha keras untuk mencapai kesempurnaan pribadi dan intelektual. Kamu mungkin berjuang dengan kecemasan internal dan perasaan tidak pernah "cukup" cerdas atau kompeten. Ingatlah, bahwa proses belajar adalah bagian dari perjalanan, dan kamu sudah sangat hebat!`,
    },
    // ---- ISTP Variants ----
    ISTP_A: {
        name: 'Sang Virtuoso yang Tegas',
        description: `Selamat [NamaPengguna]! Kamu adalah seorang ISTP-A, sang Virtuoso yang Tegas. Kamu adalah individu yang praktis, realistis, dan spontan, dengan kepercayaan diri yang kuat. Kamu senang menjelajahi dunia ini melalui tangan dan mata, dan sangat terampil dalam memecahkan masalah praktis. Kamu bisa tetap tenang di bawah tekanan dan tidak mudah terganggu. Kamu ini "problem solver" sejati!

                <strong>Kekuatanmu yang Bersinar:</strong> Kamu sangat adaptif, logis, terampil secara mekanis, berani, dan tenang dalam situasi krisis. Kamu adalah pemecah masalah yang hebat dan tidak takut mengambil risiko.

                <strong>Area untuk Terus Bertumbuh:</strong> Terkadang kamu bisa sedikit impulsif atau sulit berkomitmen pada rencana jangka panjang. Ada kalanya kamu mengabaikan perasaan orang lain, yang mungkin membuatmu terlihat acuh tak acuh. Cobalah untuk lebih peka, ya!

                <strong>Gayamu dalam Berinteraksi Sosial:</strong> Kamu santai dan pragmatis, lebih suka berinteraksi melalui aktivitas bersama daripada percakapan yang terlalu mendalam. Kamu sangat menghargai kemandirian, baik untuk dirimu sendiri maupun orang lain.

                <strong>Caramu Bekerja:</strong> Kamu akan unggul dalam pekerjaan yang membutuhkan pemecahan masalah langsung dan keterampilan tangan yang cekatan. Kamu tidak suka birokrasi dan lebih suka bekerja secara mandiri, dengan tanganmu sendiri.

                <strong>Kehidupan Pribadimu:</strong> Kamu selalu mencari sensasi dan pengalaman baru. Kamu menikmati petualangan dan kebebasan, menjalani hidup sepenuhnya di saat ini, dan belajar banyak melalui eksplorasi praktis. Hidupmu adalah sebuah eksperimen yang menyenangkan!`,
    },
    ISTP_T: {
        name: 'Sang Virtuoso yang Bergejolak',
        description: `Hai [NamaPengguna]! Hasilmu adalah ISTP-T, si Virtuoso yang Bergejolak. Kamu adalah individu yang praktis, realistis, dan spontan, sama seperti ISTP lainnya. Namun, kamu lebih peka terhadap kritik dan cenderung lebih cemas tentang kinerjamu. Kamu menikmati memecahkan masalah, tetapi mungkin berjuang dengan keraguan diri dan kekhawatiran internal.

                <strong>Kekuatanmu yang Bersinar:</strong> Kamu sama adaptifnya dengan ISTP-A, namun dengan dorongan yang lebih besar untuk terus meningkatkan keterampilanmu. Kamu bisa sangat teliti dalam aktivitas praktis karena ingin semua berjalan sempurna.

                <strong>Area untuk Terus Bertumbuh:</strong> Kamu cenderung mudah merasa frustrasi jika tidak segera berhasil, dan bisa menjadi terlalu kritis terhadap diri sendiri. Kamu mungkin membutuhkan lebih banyak validasi eksternal untuk merasa yakin. Ingat, kegagalan adalah guru terbaik!

                <strong>Gayamu dalam Berinteraksi Sosial:</strong> Kamu bisa lebih tertutup dan berhati-hati, kadang menarik diri jika merasa tidak dihargai atau dikritik. Kamu mungkin butuh waktu untuk membuka diri sepenuhnya.

                <strong>Caramu Bekerja:</strong> Kamu mahir dalam memecahkan masalah dengan cepat, tetapi mungkin mengalami tekanan internal untuk melakukan pekerjaan dengan sempurna. Kamu bisa merasa cemas tentang hasilnya, meskipun kamu sebenarnya sangat mampu.

                <strong>Kehidupan Pribadimu:</strong> Kamu selalu mencari pengalaman baru, tetapi mungkin merasa cemas tentang kinerjamu dalam setiap aktivitas tersebut. Kamu berjuang dengan perasaan tidak pernah "cukup" terampil atau kompeten. Jangan khawatir, kamu jauh lebih baik dari yang kamu kira!`,
    },
    // ---- ISFP Variants ----
    ISFP_A: {
        name: 'Sang Petualang yang Tegas',
        description: `Selamat [NamaPengguna]! Kamu adalah seorang ISFP-A, sang Petualang yang Tegas. Kamu adalah individu yang sensitif, artistik, dan fleksibel, dengan rasa diri yang kuat. Kamu hidup sepenuhnya di saat ini, sangat menghargai keindahan di sekitarmu, dan memiliki keinginan kuat untuk kebebasan berekspresi. Kamu tidak terlalu peduli dengan validasi dari luar karena kamu sudah merasa lengkap dengan dirimu sendiri.

                <strong>Kekuatanmu yang Bersinar:</strong> Kamu sangat kreatif, berempati, adaptif, spontan, dan menghargai kebebasan sejati. Kamu mengekspresikan dirimu dengan indah melalui seni dan tindakan.

                <strong>Area untuk Terus Bertumbuh:</strong> Kamu mungkin sulit membuat rencana jangka panjang dan bisa terlalu mudah menyerah pada hal-hal yang tidak menyenangkan. Terkadang kamu kurang tegas dalam menyampaikan keinginanmu. Jangan ragu untuk bersuara, ya!

                <strong>Gayamu dalam Berinteraksi Sosial:</strong> Kamu ramah dan mudah bergaul, tetapi kamu juga membutuhkan ruang pribadimu sendiri. Kamu menunjukkan kasih sayangmu melalui tindakan nyata dan kehadiran yang tulus, bukan sekadar kata-kata.

                <strong>Caramu Bekerja:</strong> Kamu akan unggul di lingkungan kerja yang fleksibel, yang memungkinkanmu untuk mengekspresikan diri dan kreativitasmu secara bebas. Kamu tidak suka rutinitas yang kaku dan batasan-batasan yang mengekang.

                <strong>Kehidupan Pribadimu:</strong> Kamu sangat menikmati pengalaman sensorik dan keindahan di sekitarmu. Kamu adalah individu yang autentik dan selalu mencari makna dalam kehidupan sehari-hari, hidup sesuai dengan nilai-nilai batinmu yang kuat. Nikmati setiap momen, sang Petualang!`,
    },
    ISFP_T: {
        name: 'Sang Petualang yang Bergejolak',
        description: `Hai [NamaPengguna]! Hasilmu adalah ISFP-T, si Petualang yang Bergejolak. Kamu adalah individu yang sensitif, artistik, dan fleksibel, sama seperti ISFP lainnya. Namun, kamu lebih peka terhadap emosi dan kritik, serta cenderung lebih berhati-hati dalam berekspresi. Kamu mencari kebebasan, tetapi mungkin berjuang dengan keraguan diri dan kecemasan.

                <strong>Kekuatanmu yang Bersinar:</strong> Kamu sangat berempati, kreatif, dan responsif terhadap lingkungan sekitarmu. Kamu punya dorongan kuat untuk terus meningkatkan ekspresi artistik atau pribadimu.

                <strong>Area untuk Terus Bertumbuh:</strong> Kamu cenderung mudah merasa bersalah atau malu, dan rentan terhadap stres. Kamu mungkin membutuhkan lebih banyak jaminan dan bisa terlalu kritis terhadap karya atau dirimu sendiri. Ingat, karyamu itu unik dan indah!

                <strong>Gayamu dalam Berinteraksi Sosial:</strong> Kamu sangat perhatian terhadap perasaan orang lain, tetapi mungkin ragu untuk menunjukkan dirimu yang sebenarnya karena takut dihakimi. Cobalah untuk lebih berani menjadi dirimu sendiri.

                <strong>Caramu Bekerja:</strong> Kamu akan unggul dalam pekerjaan yang memungkinkan kreativitas, tetapi mungkin merasa tertekan oleh ekspektasi atau kritik. Terkadang kamu bisa menunda-nunda karena perfeksionisme yang tinggi.

                <strong>Kehidupan Pribadimu:</strong> Kamu selalu mencari keindahan dan makna dalam hidup, tetapi berjuang dengan kecemasan internal tentang apakah kamu sudah melakukan cukup atau apakah kamu sudah cukup baik. Kamu mencari validasi dan penerimaan, dan itu wajar kok. Tetaplah berkreasi!`,
    },
    // ---- INFP Variants ----
    INFP_A: {
        name: 'Sang Mediator yang Tegas',
        description: `Selamat [NamaPengguna]! Kamu adalah seorang INFP-A, sang Mediator yang Tegas. Kamu adalah individu yang idealistik, ingin tahu, dan berempati, dengan rasa diri yang kuat. Kamu didorong oleh nilai-nilai yang kokoh, selalu mencari makna dalam segala hal, dan sangat peduli terhadap orang lain. Kamu tidak banyak terpengaruh oleh keraguan atau validasi eksternal, karena kompas moralmu sangat kuat.

                <strong>Kekuatanmu yang Bersinar:</strong> Kamu sangat kreatif, berempati, idealistik, otentik, dan gigih dalam mengejar nilai-nilai yang kamu yakini. Kamu percaya pada visimu dan tidak mudah goyah.

                <strong>Area untuk Terus Bertumbuh:</strong> Terkadang kamu bisa terlalu idealis, yang mungkin membuatmu sulit menghadapi kenyataan pahit. Ada kalanya kamu terlalu menjaga diri dan sulit membuka sepenuhnya. Jangan lupa, dunia ini butuh idealisme, tapi juga realisme.

                <strong>Gayamu dalam Berinteraksi Sosial:</strong> Kamu hangat dan sangat peduli. Kamu selalu mencari koneksi yang mendalam dan bermakna. Kamu adalah pendengar yang luar biasa dan sangat mendukung teman-temanmu.

                <strong>Caramu Bekerja:</strong> Kamu akan unggul dalam peran yang memungkinkanmu untuk mengejar tujuan yang bermakna dan berekspresi secara kreatif, seperti menulis, seni, atau konseling. Kamu sangat termotivasi oleh nilai-nilai yang kamu anut.

                <strong>Kehidupan Pribadimu:</strong> Kamu sangat introspektif dan selalu mencari tujuan hidup yang lebih tinggi. Kamu hidup sesuai dengan sistem nilai internalmu yang kuat, dan menemukan kepuasan sejati dalam membantu orang lain serta mengejar aspirasi idealismu. Jiwamu adalah lautan ide dan empati!`,
    },
    INFP_T: {
        name: 'Sang Mediator yang Bergejolak',
        description: `Hai [NamaPengguna]! Hasilmu adalah INFP-T, si Mediator yang Bergejolak. Kamu adalah individu yang idealistik, ingin tahu, dan berempati, sama seperti INFP lainnya. Namun, kamu lebih peka terhadap kritik dan cenderung lebih cemas tentang apakah kamu memenuhi harapanmu sendiri. Kamu punya keinginan kuat untuk membuat perbedaan, tetapi mungkin berjuang dengan keraguan diri dan kekhawatiran yang mendalam.

                <strong>Kekuatanmu yang Bersinar:</strong> Kamu sangat berempati, punya wawasan luas, dan didorong oleh keinginan kuat untuk kebaikan. Kamu punya dorongan besar untuk terus memperbaiki diri dan sangat sensitif terhadap kebutuhan orang lain.

                <strong>Area untuk Terus Bertumbuh:</strong> Kamu mudah merasa stres dan rentan terhadap kritik. Kamu bisa menjadi terlalu keras pada diri sendiri dan mungkin kesulitan membuat keputusan karena takut membuat kesalahan. Ingat, setiap langkah kecil itu berarti!

                <strong>Gayamu dalam Berinteraksi Sosial:</strong> Kamu sangat perhatian terhadap perasaan orang lain dan berusaha keras menghindari konflik. Kamu mungkin membutuhkan jaminan dan dukungan lebih sering, karena kamu cenderung memikirkan banyak hal.

                <strong>Caramu Bekerja:</strong> Kamu berdedikasi dan etis, bekerja dengan hati dan pikiranmu. Namun, kamu mungkin mengalami tekanan batin yang signifikan untuk mencapai kesempurnaan dalam pekerjaanmu dan memenuhi standar tinggi.

                <strong>Kehidupan Pribadimu:</strong> Kamu sangat introspektif dan selalu mencari makna yang mendalam dalam hidup. Kamu berjuang dengan kecemasan internal untuk memenuhi standar tinggi yang kamu tetapkan untuk diri sendiri, dan ingin memastikan semua tindakanmu selaras dengan nilai-nilai luhurmu. Kamu adalah jiwa yang penuh semangat dan refleksi!`,
    },
    // ---- INTP Variants ----
    INTP_A: {
        name: 'Sang Logikus yang Tegas',
        description: `Selamat [NamaPengguna]! Kamu adalah seorang INTP-A, sang Logikus yang Tegas. Kamu adalah individu yang analitis, objektif, dan inovatif, dengan kepercayaan diri yang kuat. Kamu punya rasa ingin tahu yang sangat besar, menyukai teori, dan mahir dalam memecahkan masalah kompleks secara logis. Kamu tidak banyak terpengaruh oleh keraguan diri, karena kamu percaya pada kekuatan pikiranmu.

                <strong>Kekuatanmu yang Bersinar:</strong> Kamu sangat cerdas, logis, orisinal dalam berpikir, mandiri, dan sangat analitis. Kamu adalah pemecah masalah yang hebat dan selalu mampu berpikir di luar kotak.

                <strong>Area untuk Terus Bertumbuh:</strong> Terkadang kamu cenderung menarik diri secara sosial atau kurang peka terhadap emosi orang lain. Ada kalanya kamu menunda-nunda tugas praktis karena terlalu sibuk dengan pemikiranmu yang kompleks. Cobalah untuk lebih terhubung dengan dunia di sekitarmu!

                <strong>Gayamu dalam Berinteraksi Sosial:</strong> Kamu lebih suka diskusi yang merangsang secara intelektual daripada interaksi sosial yang dangkal. Kamu mungkin terlihat acuh tak acuh atau jauh, tapi itu karena fokusmu pada ide-ide.

                <strong>Caramu Bekerja:</strong> Kamu akan unggul dalam pekerjaan yang membutuhkan analisis mendalam, penelitian, dan pengembangan konsep-konsep baru. Kamu sangat menghargai otonomi dan kebebasan intelektual.

                <strong>Kehidupan Pribadimu:</strong> Kamu didorong oleh rasa ingin tahu intelektual yang tak terbatas. Kamu menghabiskan banyak waktu dalam pikiranmu sendiri, menganalisis, dan memecahkan teka-teki dunia ini. Pikiranmu adalah laboratorium ide-ide brilian!`,
    },
    INTP_T: {
        name: 'Sang Logikus yang Bergejolak',
        description: `Hai [NamaPengguna]! Hasilmu adalah INTP-T, si Logikus yang Bergejolak. Kamu adalah individu yang analitis, objektif, dan inovatif, sama seperti INTP lainnya. Namun, kamu lebih peka terhadap kritik dan cenderung lebih cemas tentang kecerdasan atau kemampuanmu. Kamu mencari kebenaran, tetapi mungkin berjuang dengan keraguan diri yang bisa menghambatmu.

                <strong>Kekuatanmu yang Bersinar:</strong> Kamu sangat analitis dan punya dorongan kuat untuk memahami dunia secara mendalam. Kamu bisa menjadi sangat teliti dalam penelitian dan pemikiranmu karena ingin mencapai kesempurnaan.

                <strong>Area untuk Terus Bertumbuh:</strong> Kamu cenderung terlalu menganalisis dan mudah merasa stres. Kamu mungkin membutuhkan lebih banyak validasi intelektual, dan bisa menunda-nunda karena takut hasilnya tidak sempurna. Ingat, proses belajar itu dinamis!

                <strong>Gayamu dalam Berinteraksi Sosial:</strong> Kamu mungkin lebih menarik diri karena kekhawatiran tentang penilaian atau untuk menghindari argumen yang tidak konstruktif. Kamu sangat mencari pengakuan atas ide-ide brillianmu.

                <strong>Caramu Bekerja:</strong> Kamu akan unggul dalam pemikiran kompleks, tetapi mungkin mengalami tekanan internal yang besar untuk menghasilkan solusi yang sempurna. Kamu bisa terbebani oleh ekspektasi yang tinggi, terutama dari dirimu sendiri.

                <strong>Kehidupan Pribadimu:</strong> Kamu didorong oleh keinginan untuk belajar dan memahami, tetapi berjuang dengan kecemasan internal tentang apakah kamu "cukup pintar" atau apakah ide-idemu cukup baik. Percayalah pada potensimu, karena pikiranmu luar biasa!`,
    },
    // ---- ESTP Variants ----
    ESTP_A: {
        name: 'Sang Pengusaha yang Tegas',
        description: `Selamat [NamaPengguna]! Kamu adalah seorang ESTP-A, sang Pengusaha yang Tegas. Kamu adalah individu yang energik, spontan, dan berorientasi pada tindakan, dengan rasa percaya diri yang tinggi. Kamu senang hidup sepenuhnya di saat ini, selalu mencari pengalaman baru, dan sangat pandai dalam situasi krisis. Kamu tidak banyak terpengaruh oleh keraguan, karena kamu adalah seorang yang berani bertindak!

                <strong>Kekuatanmu yang Bersinar:</strong> Kamu sangat berani, adaptif, praktis, karismatik, dan gesit dalam memecahkan masalah di tempat. Kamu menikmati menjadi pusat perhatian dan tidak takut mengambil risiko yang diperhitungkan.

                <strong>Area untuk Terus Bertumbuh:</strong> Terkadang kamu cenderung impulsif atau kurang perencanaan jangka panjang. Ada kalanya kamu bisa terlalu ceroboh atau mengabaikan konsekuensi di masa depan. Cobalah untuk sedikit lebih strategis, ya!

                <strong>Gayamu dalam Berinteraksi Sosial:</strong> Kamu ramah, mudah bergaul, dan sangat menarik. Kamu adalah "jiwa" dari setiap pesta dan menikmati interaksi yang hidup serta aktif dengan banyak orang.

                <strong>Caramu Bekerja:</strong> Kamu akan unggul dalam situasi yang dinamis dan membutuhkan tindakan cepat. Kamu adalah pemecah masalah yang hebat di lapangan dan lebih suka belajar melalui pengalaman langsung.

                <strong>Kehidupan Pribadimu:</strong> Kamu selalu mencari kegembiraan dan petualangan. Kamu menjalani hidup ini sepenuhnya, dengan fokus pada apa yang terjadi sekarang dan apa yang bisa kamu alami selanjutnya. Hidup bagimu adalah sebuah arena yang penuh aksi!`,
    },
    ESTP_T: {
        name: 'Sang Pengusaha yang Bergejolak',
        description: `Hai [NamaPengguna]! Hasilmu adalah ESTP-T, si Pengusaha yang Bergejolak. Kamu adalah individu yang energik, spontan, dan berorientasi pada tindakan, sama seperti ESTP lainnya. Namun, kamu lebih peka terhadap kritik dan cenderung lebih cemas tentang kinerjamu. Kamu mencari kegembiraan, tetapi mungkin berjuang dengan keraguan diri dan kekhawatiran internal.

                <strong>Kekuatanmu yang Bersinar:</strong> Kamu sama adaptifnya dengan ESTP-A, namun dengan dorongan yang lebih besar untuk terus meningkatkan keterampilan dan mencapai kesempurnaan dalam setiap tindakanmu.

                <strong>Area untuk Terus Bertumbuh:</strong> Kamu cenderung mudah merasa frustrasi jika tidak segera berhasil, dan bisa menjadi terlalu kritis terhadap diri sendiri. Kamu mungkin membutuhkan lebih banyak validasi eksternal untuk merasa yakin. Ingat, tidak semua hal harus sempurna!

                <strong>Gayamu dalam Berinteraksi Sosial:</strong> Kamu bisa lebih menarik diri atau berhati-hati dalam situasi baru karena kekhawatiran akan penilaian. Kamu sangat mencari pengakuan atas tindakan beranimu.

                <strong>Caramu Bekerja:</strong> Kamu mahir dalam bertindak cepat, tetapi mungkin mengalami tekanan internal untuk melakukan pekerjaan dengan sempurna. Kamu bisa merasa cemas tentang hasilnya, meskipun kamu sebenarnya sangat mampu.

                <strong>Kehidupan Pribadimu:</strong> Kamu selalu mencari pengalaman baru, tetapi mungkin merasa cemas tentang kinerjamu dalam setiap aktivitas tersebut. Kamu berjuang dengan perasaan tidak pernah "cukup" berani atau kompeten. Santai saja, kamu sudah hebat!`,
    },
    // ---- ESFP Variants ----
    ESFP_A: {
        name: 'Sang Penghibur yang Tegas',
        description: `Selamat [NamaPengguna]! Kamu adalah seorang ESFP-A, sang Penghibur yang Tegas. Kamu adalah individu yang ramah, ceria, dan spontan, dengan rasa percaya diri yang tinggi. Kamu menikmati menjadi pusat perhatian, memiliki energi yang menular, dan senang menghibur orang lain. Kamu tidak banyak terpengaruh oleh kritik, karena kamu tahu bagaimana membawa kebahagiaan!

                <strong>Kekuatanmu yang Bersinar:</strong> Kamu sangat sosial, optimis, spontan, antusias, dan adaptif. Kamu hidup sepenuhnya di saat ini dan selalu menyebarkan kegembiraan kepada orang di sekitarmu.

                <strong>Area untuk Terus Bertumbuh:</strong> Terkadang kamu cenderung impulsif atau kurang perencanaan jangka panjang. Kamu bisa mudah terganggu dan mungkin menghindari konflik. Cobalah untuk sedikit lebih fokus dan hadapi masalah, ya!

                <strong>Gayamu dalam Berinteraksi Sosial:</strong> Kamu adalah pusat perhatian alami, sangat sosial dan ramah. Kamu menikmati berada di sekitar orang lain dan selalu memastikan semua orang tertawa dan merasa nyaman.

                <strong>Caramu Bekerja:</strong> Kamu akan unggul dalam peran yang membutuhkan interaksi dengan banyak orang dan pelayanan. Kamu adalah komunikator yang hebat dan sangat menikmati pekerjaan yang menyenangkan dan dinamis.

                <strong>Kehidupan Pribadimu:</strong> Kamu selalu mencari kesenangan dan pengalaman baru. Kamu menikmati hidup ini sepenuhnya, dengan fokus pada apa yang bisa kamu nikmati di saat ini dan bagaimana kamu bisa berbagi kegembiraan dengan orang lain. Hidup bagimu adalah sebuah panggung yang gemerlap!`,
    },
    ESFP_T: {
        name: 'Sang Penghibur yang Bergejolak',
        description: `Hai [NamaPengguna]! Hasilmu adalah ESFP-T, si Penghibur yang Bergejolak. Kamu adalah individu yang ramah, ceria, dan spontan, sama seperti ESFP lainnya. Namun, kamu lebih peka terhadap emosi dan kritik, serta cenderung lebih cemas tentang bagaimana kamu dipersepsikan oleh orang lain. Kamu mencari kesenangan, tetapi mungkin berjuang dengan keraguan diri dan kekhawatiran internal.

                <strong>Kekuatanmu yang Bersinar:</strong> Kamu sangat berempati, antusias, dan responsif terhadap lingkungan sekitarmu. Kamu punya dorongan yang kuat untuk terus meningkatkan interaksi sosial dan menghibur orang lain.

                <strong>Area untuk Terus Bertumbuh:</strong> Kamu cenderung mudah merasa cemas tentang pandangan orang lain dan rentan terhadap stres. Kamu mungkin membutuhkan lebih banyak jaminan dan bisa terlalu kritis terhadap penampilan atau tindakanmu sendiri. Ingat, kamu sudah luar biasa!

                <strong>Gayamu dalam Berinteraksi Sosial:</strong> Kamu sangat perhatian terhadap perasaan orang lain dan berusaha untuk disukai. Kamu mungkin ragu untuk mengambil risiko sosial atau menunjukkan sisi rentanmu karena takut dihakimi.

                <strong>Caramu Bekerja:</strong> Kamu akan unggul dalam peran yang memungkinkan interaksi sosial, tetapi mungkin merasa tertekan oleh ekspektasi atau kritik. Terkadang kamu bisa menunda-nunda karena perfeksionisme yang tinggi.

                <strong>Kehidupan Pribadimu:</strong> Kamu selalu mencari kegembiraan dan koneksi, tetapi berjuang dengan kecemasan internal tentang apakah kamu sudah melakukan cukup atau apakah kamu cukup disukai. Kamu mencari validasi dan penerimaan, dan itu hal yang wajar. Tetaplah bersinar!`,
    },
    // ---- ENFP Variants ----
    ENFP_A: {
        name: 'Sang Juru Kampanye yang Tegas',
        description: `Selamat [NamaPengguna]! Kamu adalah seorang ENFP-A, sang Juru Kampanye yang Tegas. Kamu adalah individu yang antusias, kreatif, dan sosial, dengan rasa percaya diri yang tinggi. Kamu memiliki semangat yang membara, ide-ide inovatif yang tak ada habisnya, dan senang terhubung dengan orang lain secara mendalam. Kamu tidak banyak terpengaruh oleh keraguan diri, karena kamu adalah pembawa perubahan sejati!

                <strong>Kekuatanmu yang Bersinar:</strong> Kamu sangat karismatik, inovatif, bersemangat, berempati, dan persuasif. Kamu punya kemampuan luar biasa untuk melihat potensi di mana-mana dan menginspirasi orang lain.

                <strong>Area untuk Terus Bertumbuh:</strong> Terkadang kamu cenderung mudah terganggu atau sulit fokus pada satu proyek. Ada kalanya kamu bisa terlalu idealis dan mungkin kurang memperhatikan detail kecil. Ingat, ide-ide hebat butuh eksekusi yang detail juga!

                <strong>Gayamu dalam Berinteraksi Sosial:</strong> Kamu sangat ramah, mudah bergaul, dan menarik. Kamu adalah komunikator yang hebat dan sangat senang menjalin hubungan yang mendalam dan bermakna dengan orang lain.

                <strong>Caramu Bekerja:</strong> Kamu akan unggul dalam peran yang membutuhkan kreativitas, kolaborasi, dan kemampuan untuk menginspirasi. Kamu tidak suka rutinitas yang membosankan dan batasan-batasan yang mengekang.

                <strong>Kehidupan Pribadimu:</strong> Hidupmu selalu dipenuhi dengan ide-ide baru dan kemungkinan yang tak terbatas. Kamu sangat menikmati eksplorasi dan pertumbuhan pribadi, selalu mencari pengalaman yang bermakna dan otentik. Teruslah menyebarkan semangatmu!`,
    },
    ENFP_T: {
        name: 'Sang Juru Kampanye yang Bergejolak',
        description: `Hai [NamaPengguna]! Hasilmu adalah ENFP-T, si Juru Kampanye yang Bergejolak. Kamu adalah individu yang antusias, kreatif, dan sosial, sama seperti ENFP lainnya. Namun, kamu lebih peka terhadap kritik dan cenderung lebih cemas tentang apakah kamu memenuhi potensi besarmu. Kamu mencari koneksi dan ide-ide baru, tetapi mungkin berjuang dengan keraguan diri dan kekhawatiran yang mendalam.

                <strong>Kekuatanmu yang Bersinar:</strong> Kamu sangat berempati, punya wawasan luas, dan didorong oleh keinginan kuat untuk kebaikan. Kamu punya dorongan besar untuk terus memperbaiki diri dan sangat sensitif terhadap kebutuhan orang lain.

                <strong>Area untuk Terus Bertumbuh:</strong> Kamu mudah merasa stres dan rentan terhadap kritik. Kamu bisa menjadi terlalu keras pada diri sendiri dan mungkin kesulitan membuat keputusan karena takut membuat kesalahan. Ingat, kamu sudah berjuang keras!

                <strong>Gayamu dalam Berinteraksi Sosial:</strong> Kamu sangat perhatian terhadap perasaan orang lain dan berusaha keras menghindari konflik. Kamu mungkin membutuhkan jaminan dan dukungan lebih sering, karena kamu cenderung memikirkan banyak hal.

                <strong>Caramu Bekerja:</strong> Kamu berdedikasi dan etis, bekerja dengan hati dan pikiranmu. Namun, kamu mungkin mengalami tekanan batin yang signifikan untuk mencapai kesempurnaan dalam pekerjaanmu dan memenuhi standar tinggi.

                <strong>Kehidupan Pribadimu:</strong> Kamu sangat introspektif dan selalu mencari makna yang mendalam dalam hidup. Kamu berjuang dengan kecemasan internal untuk memenuhi standar tinggi yang kamu tetapkan untuk diri sendiri, dan ingin memastikan semua tindakanmu selaras dengan nilai-nilai luhurmu. Kamu adalah jiwa yang penuh semangat dan refleksi!`,
    },
    // ---- ENTP Variants ----
    ENTP_A: {
        name: 'Sang Pendebat yang Tegas',
        description: `Selamat [NamaPengguna]! Kamu adalah seorang ENTP-A, sang Pendebat yang Tegas. Kamu adalah individu yang cerdas, inovatif, dan senang menantang status quo, dengan rasa percaya diri yang tinggi. Kamu suka sekali berdebat ide-ide, menemukan celah dalam argumen, dan selalu mencari cara baru untuk melakukan sesuatu. Kamu tidak banyak terpengaruh keraguan diri, karena kamu tahu pikiranmu sangat tajam!

                <strong>Kekuatanmu yang Bersinar:</strong> Kamu sangat cerdas, logis, orisinal, argumentatif, dan punya pemikiran yang sangat cepat. Kamu senang mengeksplorasi ide-ide baru dan menantang segala hal yang sudah ada.

                <strong>Area untuk Terus Bertumbuh:</strong> Terkadang kamu bisa terlihat kontroversial atau sulit berkomitmen pada satu hal. Ada kalanya kamu mengabaikan detail emosional atau mungkin terlalu banyak berdebat sampai orang lain lelah. Cobalah untuk sedikit lebih diplomatis, ya!

                <strong>Gayamu dalam Berinteraksi Sosial:</strong> Kamu karismatik dan menarik, sangat menikmati debat yang merangsang secara intelektual. Terkadang kamu bisa terlihat agresif atau kurang peka dalam argumen, tapi niatmu sebenarnya adalah mencari kebenaran.

                <strong>Caramu Bekerja:</strong> Kamu akan unggul dalam peran yang membutuhkan inovasi, pemecahan masalah, dan kemampuan untuk melihat berbagai perspektif. Kamu tidak suka rutinitas dan sangat menghargai kebebasan intelektual.

                <strong>Kehidupan Pribadimu:</strong> Kamu didorong oleh rasa ingin tahu intelektual yang tak terbatas. Kamu menikmati setiap tantangan dan selalu mencari cara baru untuk memahami dunia serta berinteraksi dengannya. Pikiranmu adalah mesin ide yang tak pernah berhenti!`,
    },
    ENTP_T: {
        name: 'Sang Pendebat yang Bergejolak',
        description: `Hai [NamaPengguna]! Hasilmu adalah ENTP-T, si Pendebat yang Bergejolak. Kamu adalah individu yang cerdas, inovatif, dan senang menantang status quo, sama seperti ENTP lainnya. Namun, kamu lebih peka terhadap kritik dan cenderung lebih cemas tentang kecerdasan atau kemampuanmu. Kamu mencari kebenaran dan ide-ide baru, tetapi mungkin berjuang dengan keraguan diri dan kekhawatiran yang mendalam.

                <strong>Kekuatanmu yang Bersinar:</strong> Kamu sangat analitis dan punya dorongan kuat untuk memahami dunia secara mendalam. Kamu bisa menjadi sangat teliti dalam penelitian dan pemikiranmu karena ingin mencapai kesempurnaan.

                <strong>Area untuk Terus Bertumbuh:</strong> Kamu cenderung terlalu menganalisis dan mudah merasa stres. Kamu mungkin membutuhkan lebih banyak validasi intelektual, dan bisa menunda-nunda karena takut hasilnya tidak sempurna. Ingat, setiap proses itu penting!

                <strong>Gayamu dalam Berinteraksi Sosial:</strong> Kamu mungkin lebih menarik diri karena kekhawatiran tentang penilaian atau untuk menghindari argumen yang tidak konstruktif. Kamu sangat mencari pengakuan atas ide-ide brillianmu.

                <strong>Caramu Bekerja:</strong> Kamu akan unggul dalam pemikiran kompleks, tetapi mungkin mengalami tekanan internal yang besar untuk menghasilkan solusi yang sempurna. Kamu bisa terbebani oleh ekspektasi yang tinggi, terutama dari dirimu sendiri.

                <strong>Kehidupan Pribadimu:</strong> Kamu didorong oleh keinginan untuk belajar dan memahami, tetapi berjuang dengan kecemasan internal tentang apakah kamu "cukup pintar" atau apakah ide-idemu cukup baik. Percayalah pada dirimu, karena potensimu tak terbatas!`,
    },
    // ---- ESTJ Variants ----
    ESTJ_A: {
        name: 'Sang Eksekutif yang Tegas',
        description: `Selamat [NamaPengguna]! Kamu adalah seorang ESTJ-A, sang Eksekutif yang Tegas. Kamu adalah individu yang teratur, efisien, dan praktis, dengan rasa percaya diri yang tinggi. Kamu adalah pemimpin alami yang sangat menghargai tradisi, kerja keras, dan selalu memastikan segala sesuatunya berjalan lancar. Kamu tidak banyak terpengaruh oleh keraguan diri, karena kamu tahu bagaimana mencapai tujuan!

                <strong>Kekuatanmu yang Bersinar:</strong> Kamu sangat terorganisir, bertanggung jawab, efisien, logis, dan tegas. Kamu adalah pemimpin yang hebat dan mampu menjalankan proyek dengan sukses.

                <strong>Area untuk Terus Bertumbuh:</strong> Terkadang kamu cenderung kaku atau kurang fleksibel terhadap perubahan. Ada kalanya kamu bisa terlalu fokus pada aturan atau mengabaikan perasaan orang lain. Cobalah untuk sedikit lebih adaptif dan peka, ya!

                <strong>Gayamu dalam Berinteraksi Sosial:</strong> Kamu langsung dan lugas, sangat menghargai kejujuran dan efisiensi dalam komunikasi. Kamu adalah pemimpin kelompok yang alami dan sering menjadi penentu arah.

                <strong>Caramu Bekerja:</strong> Kamu sangat berorientasi pada hasil dan efisiensi. Kamu akan unggul dalam peran manajemen, di mana kamu dapat mengatur dan memimpin tim untuk mencapai tujuan dengan sempurna.

                <strong>Kehidupan Pribadimu:</strong> Kamu konsisten dan bisa diandalkan, selalu menciptakan lingkungan yang stabil dan teratur. Kamu menemukan kepuasan sejati dalam struktur dan dalam memenuhi semua tanggung jawabmu. Kamu adalah arsitek dari ketertiban dalam hidupmu!`,
    },
    ESTJ_T: {
        name: 'Sang Eksekutif yang Bergejolak',
        description: `Hai [NamaPengguna]! Hasilmu adalah ESTJ-T, si Eksekutif yang Bergejolak. Kamu adalah individu yang teratur, efisien, dan praktis, sama seperti ESTJ lainnya. Namun, kamu lebih peka terhadap kritik dan cenderung lebih cemas tentang kinerja atau kepemimpinanmu. Kamu ingin mencapai tujuan, tetapi mungkin berjuang dengan keraguan diri dan kekhawatiran internal.

                <strong>Kekuatanmu yang Bersinar:</strong> Kamu sangat terorganisir dan punya dorongan kuat untuk mencapai kesempurnaan. Kamu sangat teliti dalam pekerjaanmu dan memimpin dengan contoh yang kuat.

                <strong>Area untuk Terus Bertumbuh:</strong> Kamu cenderung terlalu kritis terhadap diri sendiri dan mudah merasa stres. Kamu mungkin membutuhkan lebih banyak validasi eksternal, dan bisa terjebak dalam detail atau takut membuat kesalahan. Ingat, proses adalah bagian dari kesuksesan!

                <strong>Gayamu dalam Berinteraksi Sosial:</strong> Kamu bisa lebih tertutup atau berhati-hati karena kekhawatiran akan penilaian. Kamu sangat mencari pengakuan atas kepemimpinanmu.

                <strong>Caramu Bekerja:</strong> Kamu berdedikasi dan perfeksionis, selalu memastikan semua tugas dilakukan dengan benar. Namun, kamu mungkin merasa terbebani oleh tekanan dan takut gagal.

                <strong>Kehidupan Pribadimu:</strong> Kamu berusaha menciptakan stabilitas dan keteraturan, tetapi berjuang dengan kecemasan internal tentang apakah kamu sudah melakukan cukup atau apakah kamu memenuhi standar tinggi yang kamu tetapkan untuk diri sendiri. Kamu adalah pemimpin yang kuat, tapi jangan lupa untuk bersantai!`,
    },
    // ---- ESFJ Variants ----
    ESFJ_A: {
        name: 'Sang Konsul yang Tegas',
        description: `Selamat [NamaPengguna]! Kamu adalah seorang ESFJ-A, sang Konsul yang Tegas. Kamu adalah individu yang peduli, sosial, dan kooperatif, dengan rasa percaya diri yang tinggi. Kamu sangat ramah, selalu ingin membantu orang lain, dan fokus pada menjaga harmoni sosial. Kamu tidak banyak terpengaruh oleh keraguan diri, karena kamu adalah pilar komunitas yang kuat!

                <strong>Kekuatanmu yang Bersinar:</strong> Kamu sangat sosial, peduli, terorganisir, praktis, dan sangat mendukung. Kamu adalah tulang punggung komunitas dan keluarga, yang selalu siap membantu.

                <strong>Area untuk Terus Bertumbuh:</strong> Terkadang kamu cenderung terlalu memprioritaskan kebutuhan orang lain di atas kebutuhanmu sendiri, yang membuatmu sulit menolak permintaan. Kamu juga bisa terlalu sensitif terhadap konflik. Ingat, penting juga untuk menjaga dirimu sendiri!

                <strong>Gayamu dalam Berinteraksi Sosial:</strong> Kamu sangat ramah dan populer, selalu menikmati berada di sekitar orang lain dan memastikan semua orang merasa nyaman. Kamu adalah tuan rumah yang hebat dan selalu bisa membuat suasana jadi menyenangkan.

                <strong>Caramu Bekerja:</strong> Kamu akan unggul dalam peran yang membutuhkan interaksi dengan banyak orang dan pelayanan. Kamu adalah pemain tim yang hebat dan selalu memastikan semua orang merasa disertakan dan dihargai.

                <strong>Kehidupan Pribadimu:</strong> Kamu berfokus pada keluarga, teman, dan komunitas. Kamu menemukan kepuasan sejati dalam membantu orang lain dan menciptakan lingkungan yang harmonis dan mendukung. Kehadiranmu membawa kehangatan dan kebahagiaan!`,
    },
    ESFJ_T: {
        name: 'Sang Konsul yang Bergejolak',
        description: `Hai [NamaPengguna]! Hasilmu adalah ESFJ-T, si Konsul yang Bergejolak. Kamu adalah individu yang peduli, sosial, dan kooperatif, sama seperti ESFJ lainnya. Namun, kamu lebih peka terhadap kritik dan cenderung lebih cemas tentang bagaimana kamu dipersepsikan oleh orang lain. Kamu ingin membantu, tetapi mungkin berjuang dengan keraguan diri dan kekhawatiran internal.

                <strong>Kekuatanmu yang Bersinar:</strong> Kamu sangat berempati, peduli, dan responsif terhadap kebutuhan orang lain. Kamu punya dorongan kuat untuk terus memperbaiki diri dan menjaga harmoni.

                <strong>Area untuk Terus Bertumbuh:</strong> Kamu mudah merasa bersalah, cenderung terlalu menganalisis situasi sosial, dan mungkin membutuhkan lebih banyak validasi. Kamu bisa rentan terhadap stres karena kekhawatiranmu. Ingat, kamu sudah melakukan yang terbaik!

                <strong>Gayamu dalam Berinteraksi Sosial:</strong> Kamu sangat perhatian terhadap perasaan orang lain dan berusaha keras untuk disukai. Kamu mungkin ragu untuk mengungkapkan kebutuhanmu sendiri karena takut menyebabkan ketidakharmonisan.

                <strong>Caramu Bekerja:</strong> Kamu berdedikasi dan teliti, selalu memastikan semua tugas dilakukan dengan benar untuk mendukung orang lain. Namun, kamu mungkin merasa terbebani oleh tekanan dan takut mengecewakan.

                <strong>Kehidupan Pribadimu:</strong> Kamu berusaha menciptakan harmoni dan dukungan bagi orang-orang terdekatmu, tetapi mungkin berjuang dengan kecemasan internal tentang apakah kamu sudah melakukan cukup atau apakah kamu sudah cukup disukai. Kamu mencari jaminan dan penerimaan, dan itu wajar kok. Tetaplah jadi pribadi yang peduli!`,
    },
    // ---- ENFJ Variants ----
    ENFJ_A: {
        name: 'Sang Protagonis yang Tegas',
        description: `Selamat [NamaPengguna]! Kamu adalah seorang ENFJ-A, sang Protagonis yang Tegas. Kamu adalah individu yang inspiratif, karismatik, dan altruistik, dengan rasa percaya diri yang tinggi. Kamu adalah pemimpin yang lahir untuk memotivasi orang lain dan berjuang untuk kebaikan yang lebih besar di dunia ini. Kamu tidak banyak terpengaruh oleh keraguan diri, karena kamu punya visi yang jelas!

                <strong>Kekuatanmu yang Bersinar:</strong> Kamu sangat karismatik, berempati, visioner, persuasif, dan komunikator yang hebat. Kamu punya kemampuan luar biasa untuk menginspirasi dan memimpin dengan contoh.

                <strong>Area Pengembangan:</strong> Cenderung terlalu idealis atau bisa mengabaikan kebutuhan dirimu sendiri demi orang lain. Terkadang kamu mungkin terlalu mengatur. Ingat, keseimbangan itu penting!

                <strong>Gayamu dalam Berinteraksi Sosial:</strong> Kamu sangat ramah, mudah bergaul, dan menarik. Kamu menikmati berinteraksi dengan orang lain dan memiliki bakat alami untuk menyatukan kelompok.

                <strong>Caramu Bekerja:</strong> Kamu akan unggul dalam peran kepemimpinan, di mana kamu dapat menginspirasi dan memotivasi tim. Kamu adalah fasilitator dan mentor yang hebat, selalu mendorong orang lain untuk berkembang.

                <strong>Kehidupan Pribadimu:</strong> Kamu berfokus pada pertumbuhan pribadi dan membantu orang lain mencapai potensi penuh mereka. Kamu menemukan kepuasan sejati dalam menciptakan perubahan positif di dunia ini dan mendukung orang-orang yang kamu cintai. Teruslah jadi inspirasi, sang Protagonis!`,
    },
    ENFJ_T: {
        name: 'Sang Protagonis yang Bergejolak',
        description: `Hai [NamaPengguna]! Hasilmu adalah ENFJ-T, si Protagonis yang Bergejolak. Kamu adalah individu yang inspiratif, karismatik, dan altruistik, sama seperti ENFJ lainnya. Namun, kamu lebih peka terhadap kritik dan cenderung lebih cemas tentang apakah kamu memenuhi harapan orang lain. Kamu ingin memimpin, tetapi mungkin berjuang dengan keraguan diri dan kekhawatiran yang mendalam.

                <strong>Kekuatanmu yang Bersinar:</strong> Kamu sangat berempati, punya wawasan luas, dan didorong oleh keinginan kuat untuk kebaikan. Kamu punya dorongan besar untuk terus memperbaiki diri dan sangat responsif terhadap kebutuhan orang lain.

                <strong>Area Pengembangan:</strong> Kamu mudah merasa stres dan rentan terhadap kritik. Kamu bisa menjadi terlalu keras pada diri sendiri dan mungkin kesulitan membuat keputusan karena takut membuat kesalahan. Ingat, kamu sudah berjuang!

                <strong>Gayamu dalam Berinteraksi Sosial:</strong> Kamu sangat perhatian terhadap perasaan orang lain dan berusaha keras menghindari konflik. Kamu mungkin membutuhkan jaminan dan dukungan lebih sering, karena kamu cenderung memikirkan banyak hal.

                <strong>Caramu Bekerja:</strong> Kamu berdedikasi dan etis, bekerja dengan hati dan pikiranmu. Namun, kamu mungkin mengalami tekanan batin yang signifikan untuk mencapai kesempurnaan dalam pekerjaanmu dan memenuhi standar tinggi.

                <strong>Kehidupan Pribadimu:</strong> Kamu sangat introspektif dan selalu mencari makna yang mendalam dalam hidup. Kamu berjuang dengan kecemasan internal untuk memenuhi standar tinggi yang kamu tetapkan untuk diri sendiri, dan ingin memastikan semua tindakanmu selaras dengan nilai-nilai luhurmu. Kamu adalah pemimpin yang peduli, jangan ragu pada dirimu!`,
    },
    // ---- ENTJ Variants ----
    ENTJ_A: {
        name: 'Sang Komandan yang Tegas',
        description: `Selamat [NamaPengguna]! Kamu adalah seorang ENTJ-A, sang Komandan yang Tegas. Kamu adalah individu yang berani, terorganisir, dan tegas, dengan rasa percaya diri yang tinggi. Kamu adalah pemimpin alami yang mampu melihat gambaran besar dan merencanakan serta melaksanakan tujuan kompleks dengan sangat efektif. Kamu tidak banyak terpengaruh keraguan diri, karena kamu tahu persis apa yang harus dilakukan!

                <strong>Kekuatanmu yang Bersinar:</strong> Kamu sangat visioner, strategis, logis, tegas, dan efisien. Kamu adalah pemimpin yang dilahirkan, dengan kemampuan luar biasa untuk memotivasi orang lain mencapai tujuan besar.

                <strong>Area Pengembangan:</strong> Terkadang kamu cenderung dominan atau kurang peka terhadap emosi orang lain. Kamu bisa terlihat dingin atau tidak sabar. Ingat, kepemimpinan juga butuh empati!

                <strong>Gayamu dalam Berinteraksi Sosial:</strong> Kamu karismatik dan persuasif, sangat menikmati diskusi yang merangsang dan selalu memimpin percakapan. Kamu mencari orang-orang yang dapat menantangmu secara intelektual.

                <strong>Caramu Bekerja:</strong> Kamu adalah pemikir strategis yang unggul dalam perencanaan dan implementasi. Kamu adalah manajer dan pemimpin proyek yang efektif, selalu mencari cara untuk meningkatkan efisiensi dan mencapai hasil maksimal.

                <strong>Kehidupan Pribadimu:</strong> Kamu berfokus pada pencapaian dan pertumbuhan. Kamu selalu mencari tantangan baru dan cara untuk memperluas pengaruhmu, didorong oleh keinginan kuat untuk menguasai dan mencapai tujuan. Kamu adalah pembangun kerajaan impianmu!`,
    },
    ENTJ_T: {
        name: 'Sang Komandan yang Bergejolak',
        description: `Hai [NamaPengguna]! Hasilmu adalah ENTJ-T, si Komandan yang Bergejolak. Kamu adalah individu yang berani, terorganisir, dan tegas, sama seperti ENTJ lainnya. Namun, kamu lebih peka terhadap kritik dan cenderung lebih cemas tentang kepemimpinan atau kemampuanmu. Kamu ingin memimpin, tetapi mungkin berjuang dengan keraguan diri dan kekhawatiran yang mendalam.

                <strong>Kekuatanmu yang Bersinar:</strong> Kamu sangat strategis dan punya dorongan kuat untuk mencapai kesempurnaan. Kamu sangat teliti dalam perencanaanmu dan memimpin dengan contoh yang menginspirasi.

                <strong>Area Pengembangan:</strong> Kamu cenderung terlalu kritis terhadap diri sendiri dan mudah merasa stres. Kamu mungkin membutuhkan lebih banyak validasi eksternal, dan bisa terjebak dalam analisis berlebihan atau takut membuat kesalahan. Ingat, kamu sudah sangat kompeten!

                <strong>Gayamu dalam Berinteraksi Sosial:</strong> Kamu mungkin lebih menarik diri atau berhati-hati karena kekhawatiran akan penilaian. Kamu sangat mencari pengakuan atas kepemimpinanmu.

                <strong>Caramu Bekerja:</strong> Kamu berdedikasi dan perfeksionis, selalu memastikan semua tugas dilakukan dengan benar. Namun, kamu mungkin merasa terbebani oleh tekanan dan takut gagal.

                <strong>Kehidupan Pribadimu:</strong> Kamu berusaha menciptakan stabilitas dan keteraturan, tetapi berjuang dengan kecemasan internal tentang apakah kamu sudah melakukan cukup atau apakah kamu memenuhi standar tinggi yang kamu tetapkan untuk diri sendiri. Kamu adalah pemimpin yang hebat, tapi jangan lupa untuk menghargai dirimu sendiri!`,
    },
};

// Fungsi untuk mengacak array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
}

// Fungsi transisi antar stage
function changeStage(newStage) {
    const appRoot = document.getElementById('app-root');
    const currentContent = appRoot.querySelector(':first-child');

    if (currentContent) {
        currentContent.classList.add('anim-fade-out');
        setTimeout(() => {
            currentStage = newStage;
            renderApp();
        }, 300); // Durasi harus cocok dengan animasi fade-out
    } else {
        currentStage = newStage;
        renderApp();
    }
}

// Fungsi untuk menangani pilihan jawaban
function handleAnswer(score) {
    const currentQuestion = shuffledQuestions[currentQuestionIndex];
    let actualScore = score;

    // Jika 'reverseScore' true, balikkan skor yang dipilih
    if (currentQuestion.reverseScore) {
        actualScore = -score;
    }

    // Perbarui total skor untuk dikotomi yang relevan
    scores[currentQuestion.dichotomy] += actualScore;

    // Pindah ke pertanyaan berikutnya atau hitung hasil
    const appRoot = document.getElementById('app-root');
    const questionCard = appRoot.querySelector(':first-child');

    questionCard.classList.add('anim-fade-out');

    setTimeout(() => {
        if (currentQuestionIndex < shuffledQuestions.length - 1) {
            currentQuestionIndex++;
            renderApp(); // Render ulang aplikasi untuk menampilkan pertanyaan berikutnya
        } else {
            // Jika semua pertanyaan terjawab, hitung tipe MBTI dan pindah ke tahap hasil
            calculateMbtiType();
            currentStage = 'results';
            renderApp(); // Render ulang aplikasi untuk menampilkan hasil
        }
    }, 300); // Durasi animasi
}

// Fungsi untuk menghitung tipe MBTI final berdasarkan skor yang terkumpul
function calculateMbtiType() {
    let type = '';
    // Untuk setiap dikotomi, jika skor tidak negatif, condong ke huruf pertama.
    // Jika tidak (skor negatif), condong ke huruf kedua.
    // Skor 0 (seri) default ke huruf pertama dalam pasangan.
    type += scores.EI >= 0 ? 'E' : 'I';
    type += scores.SN >= 0 ? 'S' : 'N';
    type += scores.TF >= 0 ? 'T' : 'F';
    type += scores.JP >= 0 ? 'J' : 'P';
    type += scores.AT >= 0 ? '_A' : '_T'; // Menggunakan underscore agar sesuai dengan kunci deskripsi
    mbtiTypeResult = type;
}

// Fungsi untuk mereset tes ke keadaan awal
function resetTest() {
    // Reset state variables
    scores = { EI: 0, SN: 0, TF: 0, JP: 0, AT: 0 };
    mbtiTypeResult = '';
    currentQuestionIndex = 0;
    shuffledQuestions = [];
    userName = '';

    // Ganti stage dengan transisi
    changeStage('welcome');
}

// Fungsi utama untuk merender tampilan aplikasi
function renderApp() {
    const appRoot = document.getElementById('app-root');
    if (!appRoot) return;

    let htmlContent = '';

    if (currentStage === 'welcome') {
        htmlContent = `
            <div class="text-center p-8 md:p-12 bg-white rounded-2xl shadow-custom-xl border border-blue-100 transform transition-transform duration-500 ease-in-out scale-95 hover:scale-100 anim-slide-up-fade-in">
                <h1 class="text-3xl md:text-5xl font-extrabold mb-4 text-gray-800 tracking-tight">Tes Kepribadian MBTI</h1>
                <p class="text-lg md:text-xl text-gray-600 mb-6 leading-relaxed">
                    Jelajahi preferensi kepribadian Anda dengan menjawab serangkaian pertanyaan sederhana.
                    Tes ini dirancang sebagai alat refleksi diri dan bukan pengganti penilaian profesional
                    dari Myers-Briggs Foundation. Jawablah dengan jujur untuk hasil yang paling akurat menurut Anda.
                </p>
                <div class="mb-6">
                    <input type="text" id="userNameInput" placeholder="Masukkan namamu di sini..."
                        class="w-full max-w-sm px-4 py-3 rounded-lg border-2 border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg text-center shadow-sm" />
                </div>
                <button id="startButton" class="btn-primary px-8 py-4 text-white font-semibold rounded-full shadow-lg-custom hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                    Mulai Tes Sekarang!
                </button>
            </div>
        `;
        appRoot.innerHTML = htmlContent;
        // Tambahkan event listener setelah elemen dirender
        document.getElementById('startButton').onclick = () => {
            const nameInput = document.getElementById('userNameInput');
            userName = nameInput.value.trim();
            if (userName === '') {
                userName = 'Teman';
            }
            // Acak pertanyaan hanya saat memulai tes
            shuffledQuestions = [...allQuestions];
            shuffleArray(shuffledQuestions);
            changeStage('test');
        };
    } else if (currentStage === 'test') {
        if (shuffledQuestions.length === 0) {
            htmlContent = `<div class="text-center text-xl text-gray-700 p-8 bg-white rounded-xl shadow-custom-lg border border-gray-200 anim-fade-in">Memuat pertanyaan...</div>`;
            appRoot.innerHTML = htmlContent;
            return;
        }

        const currentQuestion = shuffledQuestions[currentQuestionIndex];
        const progress = ((currentQuestionIndex + 1) / shuffledQuestions.length) * 100;

        let optionsHtml = '';
        likertOptions.forEach((option) => {
            optionsHtml += `
                <button class="option-button w-full px-5 py-3 rounded-xl cursor-pointer text-gray-800 font-medium"
                        onclick="handleAnswer(${option.score})">
                    <span>${option.text}</span>
                </button>
            `;
        });

        htmlContent = `
            <div class="w-full max-w-xl mx-auto bg-white p-8 rounded-2xl shadow-custom-xl border border-blue-100 anim-slide-up-fade-in">
                <p class="text-sm text-gray-500 mb-2 font-medium">
                    Pertanyaan ${currentQuestionIndex + 1} dari ${shuffledQuestions.length}
                </p>
                <div class="w-full bg-gray-200 rounded-full h-3 mb-6 overflow-hidden">
                    <div class="bg-gradient-to-r from-blue-400 to-blue-600 h-full rounded-full transition-all duration-500 ease-out"
                         style="width: ${progress}%"></div>
                </div>
                <h2 class="text-xl md:text-2xl font-semibold mb-6 text-gray-800 leading-relaxed">
                    ${currentQuestion.text}
                </h2>
                <div class="space-y-4">
                    ${optionsHtml}
                </div>
            </div>
        `;
        appRoot.innerHTML = htmlContent;
    } else if (currentStage === 'results') {
        let description = mbtiDescriptions[mbtiTypeResult] || {
            name: 'Tipe Tidak Ditemukan',
            description: 'Maaf, deskripsi untuk tipe ini belum tersedia. Silakan coba lagi atau mungkin ada masalah dengan perhitungan skor.'
        };

        description = {
            ...description,
            description: description.description.replace(/\[NamaPengguna\]/g, userName)
        };

        htmlContent = `
            <div class="w-full max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-custom-xl border border-blue-100 text-center anim-slide-up-fade-in">
                <h2 class="text-2xl md:text-4xl font-extrabold mb-4 text-gray-800">
                    Hasil Tes Kepribadian Anda:
                </h2>
                <p class="text-5xl md:text-7xl font-extrabold text-blue-700 mb-6 animate-subtle-pulse tracking-wide">
                    ${mbtiTypeResult.replace('_', '')}
                </p>
                <h3 class="text-xl md:text-3xl font-semibold text-gray-700 mb-8">
                    ${description.name}
                </h3>
                <div class="text-gray-700 text-left mb-8 whitespace-pre-wrap description-content px-4">
                    ${description.description}
                </div>

                <div class="mt-8 mb-6 p-6 bg-blue-50 rounded-xl border border-blue-200 text-left shadow-inner preference-summary">
                    <h4 class="text-lg font-semibold text-blue-800 mb-4">Kekuatan Preferensi Anda:</h4>
                    <ul class="text-blue-700 space-y-3">
                        <li>
                            <strong>Extraversion (E) / Introversion (I):</strong>
                            <span class="font-bold text-blue-600">
                                ${scores.EI > 0 ? `E (Skor: ${scores.EI})` : `I (Skor: ${scores.EI})`}
                            </span>
                        </li>
                        <li>
                            <strong>Sensing (S) / Intuition (N):</strong>
                            <span class="font-bold text-blue-600">
                                ${scores.SN > 0 ? `S (Skor: ${scores.SN})` : `N (Skor: ${scores.SN})`}
                            </span>
                        </li>
                        <li>
                            <strong>Thinking (T) / Feeling (F):</strong>
                            <span class="font-bold text-blue-600">
                                ${scores.TF > 0 ? `T (Skor: ${scores.TF})` : `F (Skor: ${scores.TF})`}
                            </span>
                        </li>
                        <li>
                            <strong>Judging (J) / Perceiving (P):</strong>
                            <span class="font-bold text-blue-600">
                                ${scores.JP > 0 ? `J (Skor: ${scores.JP})` : `P (Skor: ${scores.JP})`}
                            </span>
                        </li>
                        <li>
                            <strong>Assertive (A) / Turbulent (T):</strong>
                            <span class="font-bold text-blue-600">
                                ${scores.AT > 0 ? `A (Skor: ${scores.AT})` : `T (Skor: ${scores.AT})`}
                            </span>
                        </li>
                    </ul>
                    <p class="text-sm text-blue-600 mt-4">
                        <em>*Skor positif menunjukkan preferensi pada huruf pertama (E, S, T, J, A), skor negatif pada huruf kedua (I, N, F, P, T). Semakin jauh skor dari 0, semakin kuat preferensinya.</em>
                    </p>
                </div>

                <button id="resetButton" class="btn-primary px-8 py-4 text-white font-semibold rounded-full shadow-lg-custom hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                    Ulangi Tes
                </button>
            </div>
        `;
        appRoot.innerHTML = htmlContent;
        document.getElementById('resetButton').onclick = resetTest;
    }
}

// Panggil renderApp saat halaman dimuat
window.onload = () => {
    renderApp();
};
