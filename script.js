// Deklarasi variabel state global
let currentStage = 'welcome'; // 'welcome', 'test', 'results'
let scores = {
    EI: 0, SN: 0, TF: 0, JP: 0, AT: 0
};
let mbtiTypeResult = '';
let currentQuestionIndex = 0;
let shuffledQuestions = [];
let userName = '';

// Daftar pertanyaan yang komprehensif
const allQuestions = [
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
const mbtiDescriptions = {
    ISTJ_A: { name: 'Ahli Logistik yang Tegas', description: `...` }, ISTJ_T: { name: 'Ahli Logistik yang Bergejolak', description: `...` }, ISFJ_A: { name: 'Sang Pembela yang Tegas', description: `...` }, ISFJ_T: { name: 'Sang Pembela yang Bergejolak', description: `...` }, INFJ_A: { name: 'Sang Advokat yang Tegas', description: `...` }, INFJ_T: { name: 'Sang Advokat yang Bergejolak', description: `...` }, INTJ_A: { name: 'Sang Arsitek yang Tegas', description: `...` }, INTJ_T: { name: 'Sang Arsitek yang Bergejolak', description: `...` }, ISTP_A: { name: 'Sang Virtuoso yang Tegas', description: `...` }, ISTP_T: { name: 'Sang Virtuoso yang Bergejolak', description: `...` }, ISFP_A: { name: 'Sang Petualang yang Tegas', description: `...` }, ISFP_T: { name: 'Sang Petualang yang Bergejolak', description: `...` }, INFP_A: { name: 'Sang Mediator yang Tegas', description: `...` }, INFP_T: { name: 'Sang Mediator yang Bergejolak', description: `...` }, INTP_A: { name: 'Sang Logikus yang Tegas', description: `...` }, INTP_T: { name: 'Sang Logikus yang Bergejolak', description: `...` }, ESTP_A: { name: 'Sang Pengusaha yang Tegas', description: `...` }, ESTP_T: { name: 'Sang Pengusaha yang Bergejolak', description: `...` }, ESFP_A: { name: 'Sang Penghibur yang Tegas', description: `...` }, ESFP_T: { name: 'Sang Penghibur yang Bergejolak', description: `...` }, ENFP_A: { name: 'Sang Juru Kampanye yang Tegas', description: `...` }, ENFP_T: { name: 'Sang Juru Kampanye yang Bergejolak', description: `...` }, ENTP_A: { name: 'Sang Pendebat yang Tegas', description: `...` }, ENTP_T: { name: 'Sang Pendebat yang Bergejolak', description: `...` }, ESTJ_A: { name: 'Sang Eksekutif yang Tegas', description: `...` }, ESTJ_T: { name: 'Sang Eksekutif yang Bergejolak', description: `...` }, ESFJ_A: { name: 'Sang Konsul yang Tegas', description: `...` }, ESFJ_T: { name: 'Sang Konsul yang Bergejolak', description: `...` }, ENFJ_A: { name: 'Sang Protagonis yang Tegas', description: `...` }, ENFJ_T: { name: 'Sang Protagonis yang Bergejolak', description: `...` }, ENTJ_A: { name: 'Sang Komandan yang Tegas', description: `...` }, ENTJ_T: { name: 'Sang Komandan yang Bergejolak', description: `...` },
};
const likertOptions = [ { text: 'Setuju', score: 2 }, { text: 'Netral', score: 0 }, { text: 'Tidak Setuju', score: -2 } ];
function shuffleArray(array) { for (let i = array.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [array[i], array[j]] = [array[j], array[i]]; } }
function handleAnswer(score) { const currentQuestion = shuffledQuestions[currentQuestionIndex]; let actualScore = score; if (currentQuestion.reverseScore) { actualScore = -score; } scores[currentQuestion.dichotomy] += actualScore; if (currentQuestionIndex < shuffledQuestions.length - 1) { currentQuestionIndex++; renderApp(); } else { calculateMbtiType(); currentStage = 'results'; renderApp(); } }
function calculateMbtiType() { let type = ''; type += scores.EI >= 0 ? 'E' : 'I'; type += scores.SN >= 0 ? 'S' : 'N'; type += scores.TF >= 0 ? 'T' : 'F'; type += scores.JP >= 0 ? 'J' : 'P'; type += scores.AT >= 0 ? '_A' : '_T'; mbtiTypeResult = type; }
function resetTest() { currentStage = 'welcome'; scores = { EI: 0, SN: 0, TF: 0, JP: 0, AT: 0 }; mbtiTypeResult = ''; currentQuestionIndex = 0; shuffledQuestions = []; userName = ''; renderApp(); }

function renderApp() {
    const appRoot = document.getElementById('app-root');
    if (!appRoot) return;

    let htmlContent = '';

    if (currentStage === 'welcome') {
        htmlContent = `
            <div class="text-center">
                <h1 class="text-4xl md:text-5xl font-extrabold mb-4 text-slate-800">Temukan Kepribadian Anda</h1>
                <p class="text-lg md:text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
                    Ikuti tes kepribadian MBTI yang modern dan akurat untuk memahami diri Anda lebih dalam.
                </p>
                <div class="mb-6">
                    <input type="text" id="userNameInput" placeholder="Ketik nama Anda..."
                        class="w-full max-w-sm px-4 py-3 rounded-lg border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-lg text-center" />
                </div>
                <button id="startButton" class="btn-primary">
                    Mulai Tes
                </button>
            </div>
        `;
        appRoot.innerHTML = htmlContent;
        document.getElementById('startButton').onclick = () => {
            const nameInput = document.getElementById('userNameInput');
            userName = nameInput.value.trim();
            if (userName === '') {
                userName = 'Teman';
            }
            currentStage = 'test';
            shuffledQuestions = [...allQuestions];
            shuffleArray(shuffledQuestions);
            renderApp();
        };
    } else if (currentStage === 'test') {
        const currentQuestion = shuffledQuestions[currentQuestionIndex];
        const progress = ((currentQuestionIndex + 1) / shuffledQuestions.length) * 100;

        let optionsHtml = '';
        likertOptions.forEach((option) => {
            optionsHtml += `
                <button class="option-button w-full px-5 py-4 rounded-lg cursor-pointer font-semibold text-lg"
                        onclick="handleAnswer(${option.score})">
                    <span>${option.text}</span>
                </button>
            `;
        });

        htmlContent = `
            <div class="w-full max-w-2xl mx-auto text-center">
                <p class="text-base text-slate-500 mb-2 font-medium">
                    Pertanyaan ${currentQuestionIndex + 1} dari ${shuffledQuestions.length}
                </p>
                <div class="w-full bg-slate-200 rounded-full h-2.5 mb-8">
                    <div class="bg-indigo-600 h-2.5 rounded-full" style="width: ${progress}%"></div>
                </div>
                <h2 class="text-2xl md:text-3xl font-bold mb-8 text-slate-800">
                    ${currentQuestion.text}
                </h2>
                <div class="space-y-4 max-w-md mx-auto">
                    ${optionsHtml}
                </div>
            </div>
        `;
        appRoot.innerHTML = htmlContent;
    } else if (currentStage === 'results') {
        let description = mbtiDescriptions[mbtiTypeResult] || {
            name: 'Tipe Tidak Ditemukan',
            description: 'Deskripsi tidak ditemukan.'
        };
        description = { ...description, description: description.description.replace(/\[NamaPengguna\]/g, userName) };

        htmlContent = `
            <div class="w-full max-w-3xl mx-auto text-center">
                <h2 class="text-2xl md:text-3xl font-bold text-slate-800 mb-2">
                    Hasil Anda, ${userName}:
                </h2>
                <p class="result-type text-6xl md:text-8xl font-extrabold text-indigo-600 mb-4">
                    ${mbtiTypeResult.replace('_', '-')}
                </p>
                <h3 class="text-3xl md:text-4xl font-bold text-slate-800 mb-8">
                    ${description.name}
                </h3>
                <div class="description-content mb-8">
                    ${description.description}
                </div>
                <div class="preference-summary text-left">
                    <h4 class="text-xl font-bold mb-4">Kekuatan Preferensi Anda:</h4>
                    <ul class="space-y-2">
                        <li><strong>Extraversion / Introversion:</strong> <span class="font-bold">${scores.EI > 0 ? `E (${scores.EI})` : `I (${scores.EI})`}</span></li>
                        <li><strong>Sensing / Intuition:</strong> <span class="font-bold">${scores.SN > 0 ? `S (${scores.SN})` : `N (${scores.SN})`}</span></li>
                        <li><strong>Thinking / Feeling:</strong> <span class="font-bold">${scores.TF > 0 ? `T (${scores.TF})` : `F (${scores.TF})`}</span></li>
                        <li><strong>Judging / Perceiving:</strong> <span class="font-bold">${scores.JP > 0 ? `J (${scores.JP})` : `P (${scores.JP})`}</span></li>
                        <li><strong>Assertive / Turbulent:</strong> <span class="font-bold">${scores.AT > 0 ? `A (${scores.AT})` : `T (${scores.AT})`}</span></li>
                    </ul>
                </div>
                <button id="resetButton" class="btn-primary mt-8">
                    Ulangi Tes
                </button>
            </div>
        `;
        appRoot.innerHTML = htmlContent;
        document.getElementById('resetButton').onclick = resetTest;
    }
}

window.onload = renderApp;
