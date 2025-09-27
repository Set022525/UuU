'use client';

import { useState, useEffect } from 'react';
import P5Sketch, { type P5Instance } from '../components/P5Sketch';
import Image from "next/image";
import { ChevronDown, ExternalLink, Menu, X, BookOpen, Award, Briefcase, User, FolderOpen, MessageSquare, Star } from 'lucide-react';
import { FaXTwitter, FaGithub, FaLinkedin, FaFacebook } from "react-icons/fa6";

type Publication = {
  title: string;
  authors: string;
  venue: string;
  year: number;
  link?: string;
};

type Work = {
  id: number;
  title: string;
  description: string;
  year: number;
  image?: string;
  link?: string;
  tags?: string[];
};

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState('about');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // 各カテゴリごとの論文データ
const intlJournals: Publication[] = [
  {
    title:
      "Mathematical Games of Dice - A Research Based Calculations Using Computer Algebra Systems",
    authors:
      "Ryohei Miyadera, <strong><u>Akira Murakami</u></strong>, Nazuki Terakawa, Keito Tanemura, Mao Fujino and Hisayoshi Sakahira",
    venue:
      "Solid State Technology, Vol. 63, No. 1s, pp. 619 - 629, 2020",
    year: 2020,
    link: "https://solidstatetechnology.us/index.php/JSST/article/view/749",
  },
  {
    title: "A Variant of Bogus Nim – Experimental Mathematics Approach",
    authors:
      "Ryohei Miyadera, Nazuki Terakawa, Keito Tanemura, <strong><u>Akira Murakami</u></strong>, Mariko Kashiwagi, Ryuhei Utsuhara",
    venue:
      "Solid State Technology, Vol. 63, No. 1s, pp. 662 – 669, 2020",
    year: 2020,
    link: "https://solidstatetechnology.us/index.php/JSST/article/view/753",
  },
];

const domesticJournals: Publication[] = [
  {
    title: "面数が異なるサイコロを用いたサイコロゲームに関する研究",
    authors:
      "鈴木利菜，<strong><u>村上 聡</u></strong>，寺川渚月，坂本悠輔，宮寺良平，川上さくら",
    venue: "ゲーム学会論文誌，14-1，pp.14-17，2020",
    year: 2020,
  },
];

  const intlConferences: Publication[] = [
  {
    title: "Mathematical Games of Dice - A Research Based Calculations Using Computer Algebra Systems",
    authors:
      "Ryohei Miyadera, <strong><u>Akira Murakami</u></strong>, Nazuki Terakawa, Keito Tanemura, Mao Fujino, Hisayoshi Sakahira, Masanori Fukui",
    venue: "The Proceedings of the 5th International Conference on Management, Engineering, Science, Social Science and Humanities, Penang, pp.54, 2020",
    year: 2020,
    link: "https://www.researchgate.net/profile/Khar-Ng-3/publication/347785430_Proceedings_iCon_MESSSH20/links/5fe3e22b92851c13feb48b4b/Proceedings-iCon-MESSSH20.pdf#page=71",
  },
  {
    title: "A Variant of Bogus Nim - Experimental Mathematics Approach",
    authors:
      "Ryohei Miyadera, Masanori Fukui, Nazuki Terakawa, Keito Tanemura, <strong><u>Akira Murakami</u></strong>, Mariko Kashiwagi, Ryuhei Utsuhara",
    venue:
      "The Proceedings of the 5th International Conference on Management, Engineering, Science, Social Science and Humanities, Penang, pp.55, 2020",
    year: 2020,
    link: "https://www.researchgate.net/profile/Khar-Ng-3/publication/347785430_Proceedings_iCon_MESSSH20/links/5fe3e22b92851c13feb48b4b/Proceedings-iCon-MESSSH20.pdf#page=72",
  },
  {
    title: "Wythoff’s Game with a Pass",
    authors:
      "Ryohei Miyadera, Mariko Kashiwagi, Masanori Fukui, <strong><u>Akira Murakami</u></strong>, Keito Tanemura, Itsuki Kitagawa, Kazuya Hiramatsu and Shintaro Kaiomto",
    venue: "JCDCG^3 2019, Tokyo, pp.100-101, 2019",
    year: 2019,
    link: "http://www.jcdcgg.u-tokai.ac.jp/JCDCG3_2019_abstracts_v1.pdf",
  },
  {
    title: "“Rugby Nim” that is a Variant of “Sliding”",
    authors:
      "Ryohei Miyadera, Mariko Kashiwagi, Michitada Hayashi, Sintarou Kaimoto, Keito Tanemura, <strong><u>Akira Murakami</u></strong>, Ryuhei Utsuhara",
    venue: "JCDCG^3 2018, Manila, pp. 41-43, 2018",
    year: 2018,
    link: "https://drive.google.com/file/d/1RFaXEdKk5TUHc1QePWsdplOR7etRZOV1/view",
  },
  {
    title: "“Sliding With a Push” that is a Variant Of “Sliding”",
    authors:
      "Ryohei Miyadera, Mariko Kashiwagi, Nazuki Terakawa, Syouta Masuda, Keito Tanemura, Sintarou Kaimoto, Ryuhei Utsuhara, <strong><u>Akira Murakami</u></strong>",
    venue: "JCDCG^3 2018, Manila, pp. 39-41, 2018",
    year: 2018,
    link: "https://drive.google.com/file/d/1RFaXEdKk5TUHc1QePWsdplOR7etRZOV1/view",
  },
];

const domesticConferences: Publication[] = [
  {
    title:
      "複数の音源対象を持つコンテンツの視聴における視線に応じた振動触覚提示手法",
    authors:
      "金井 美桜，藤田 和之，<strong><u>村上 聡</u></strong>，齋藤 五大，北村 喜文",
    venue: "第30回日本バーチャルリアリティ学会大会 (VRSJ’25)，2025，大阪",
    year: 2025,
    link: "https://conference.vrsj.org/ac2025/program/doc/3E2-06.pdf",
  },
  {
    title: "折紙構造を用いた自走式・形態変化パーティションデバイス",
    authors: "<strong><u>村上 聡</u></strong>，藤田 和之，北村 喜文",
    venue:
      "第32回インタラクティブシステムとソフトウェアに関するワークショップ (WISS’24)，2024，新潟",
    year: 2024,
    link: "https://www.wiss.org/WISS2024Proceedings/data/demo//2-B08.pdf",
  },
  {
    title: "ゲーム・パズルの変形・改良に着目した創造性発揮プロセスの実態把握",
    authors:
      "福井 昌則，柏木 麻理子，寺本 雅治，<strong><u>村上 聡</u></strong>，種村 圭依人，宮寺 良平，平嶋 宗",
    venue: "「ゲームと教育」研究部会第12回研究会，2019，香川",
    year: 2019,
    link: "https://www.gameamusementsociety.org/article.php?story=GameEdu_12",
  },
  {
    title: "サイコロゲームの数学",
    authors:
      "寺川 渚月，<strong><u>村上 聡</u></strong>，柏木 麻里子，寺本 雅治，坂本 悠輔，宮寺 良平，北川 一希，平松 和也",
    venue: "ゲーム学会第18回全国大会，2019，大阪",
    year: 2019,
    link: "https://www.gameamusementsociety.org/staticpages/index.php?page=GAS_18th_program",
  },
  {
    title: "Wythoff のゲームの変種-制限付きの 2 つの Rook",
    authors:
      "寺川 渚月，<strong><u>村上 聡</u></strong>，宮寺 良平，北川 一希，平松 和也，青山 あいほ，末續 鴻輝",
    venue: "ゲーム学会第18回全国大会，2019，大阪",
    year: 2019,
    link: "https://www.gameamusementsociety.org/staticpages/index.php?page=GAS_18th_program",
  },
];

  // Worksデータを定義
const worksData: Work[] = [
  {
    id: 1,
    title: "Rhizome",
    image: "works/rhizome.png",
    description: "Rhizomeは会話内容をグラフネットワーク形式で自動で要約してくれる会議サポートツールです．",
    year: 2024,
    tags: ["Web App", "minutes", "Graph Network"],
    link: "https://github.com/Set022525/Rhizome"
  },
  {
    id: 2,
    title: "DigLike",
    image: "works/JPHACKS2022.png",
    description: "DigLikeはTwitterのいいねを自動で整理し，空き時間に聞けるPodcastに変換するアプリです．",
    year: 2022,
    tags: ["Web App", "Podcast", "NLP"],
    link: "https://github.com/jphacks/A_2205"
  },
  {
    id: 3,
    title: "Morbido",
    image: "works/morbido.png",
      description: "Mobidoは導電性繊維を用いたふわふわなセンサーです．",
    year: 2021,
    tags: ["Electronics", "Fabrication", "Sensor"],
    link: "https://www.tohoku.ac.jp/japanese/2021/12/press20211222-01-idea.html"
  },
];

  // WorkCardコンポーネント
function WorkCard({ work }: { work: Work }) {
  return (
    <div className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
      <div className="aspect-video bg-gray-200 group-hover:bg-gray-300 transition-colors relative">
        {work.image && (
          <Image
            src={work.image}
            alt={work.title}
            fill
            className="object-cover"
          />
        )}
      </div>
      <div className="p-6">
        <h3 className="text-lg font-light mb-2">{work.title}</h3>
        <p className="text-gray-600 font-light text-sm mb-4">
          {work.description}
        </p>
        {work.tags && (
          <div className="flex flex-wrap gap-2 mb-4">
            {work.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full font-light"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500 font-light">{work.year}</span>
          {work.link && (
            <a
              href={work.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink size={16} className="text-gray-400 group-hover:text-gray-600 transition-colors" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

  function PublicationList({
  pubs,
}: {
  pubs: Publication[];
}) {
  const sorted = [...pubs].sort((a, b) => b.year - a.year);

  return (
    <div className="space-y-8 mb-12">
      {sorted.map((pub, idx) => (
        <div
          key={idx}
          className="group hover:bg-gray-300 p-6 rounded-lg transition-all duration-300"
        >
          <h4 className="text-lg font-light mb-2">
            [{sorted.length - idx}] {pub.title}
          </h4>
          <p
            className="text-gray-600 font-light mb-4"
            dangerouslySetInnerHTML={{ __html: pub.authors }}
          />
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500 font-light">
              {pub.venue}
            </span>
            {pub.link && (
              <a
                href={pub.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink
                  size={16}
                  className="text-gray-400 group-hover:text-gray-600 transition-colors"
                />
              </a>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}


  useEffect(() => {
    const handleScroll = () => {
      const sections = ['about', 'education',  'work', 'publications', 'works', 'awards', 'misc', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const top = element.offsetTop;
          const bottom = top + element.offsetHeight;

          if (scrollPosition >= top && scrollPosition <= bottom) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const navigationItems = [
    { id: 'about', label: 'About', icon: User },
    { id: 'education', label: 'Education', icon: BookOpen },
    { id: 'work', label: 'Work Experiences', icon: Briefcase },
    { id: 'publications', label: 'Publications', icon: BookOpen },
    { id: 'works', label: 'Works', icon: FolderOpen },
    { id: 'awards', label: 'Awards', icon: Award },
    { id: 'misc', label: 'Misc.', icon: Star },
    { id: 'contact', label: 'Contact', icon: MessageSquare },
  ];

  // p5.js sketch
  const sketch = (p: P5Instance) => {
  // レスポンシブなキャンバスサイズ
  let canvasWidth: number;
  let canvasHeight: number;

  let autoRotate = true;
  let rotationAngle = 0;
  let rotationSpeed = 0.005;
  let cameraRadius = 1200;
  let cameraHeight = -200;
  let roomSize = 400;
  let wallHeight = 300;
  let isDragging = false;
  let lastMouseX = 0;
  let lastMouseY = 0;
  let mouseIdleTime = 0;
  let maxIdleTime = 120;

  // タッチ関連の変数
  let touchStartX = 0;
  let touchStartY = 0;
  let isTouch = false;

  // キャンバスサイズを計算する関数
  const calculateCanvasSize = () => {
    const isMobile = window.innerWidth <= 768;
    if (isMobile) {
      // スマホの場合はビューポートの90%、最大400px
      canvasWidth = Math.min(window.innerWidth * 0.9, 400);
      canvasHeight = Math.min(window.innerHeight * 0.5, 400);
    } else {
      // デスクトップの場合は元のサイズ
      canvasWidth = 800;
      canvasHeight = 600;
    }
  };

  p.setup = () => {
    calculateCanvasSize();
    const canvas = p.createCanvas(canvasWidth, canvasHeight, p.WEBGL);

    // キャンバス要素にタッチイベントリスナーを追加
    const canvasElement = canvas.elt as HTMLCanvasElement;

    // タッチイベントでのスクロール防止
    canvasElement.addEventListener('touchstart', (e) => {
      e.preventDefault();
      isTouch = true;
      const touch = e.touches[0];
      touchStartX = touch.clientX;
      touchStartY = touch.clientY;
      autoRotate = false;
      mouseIdleTime = 0;
    }, { passive: false });

    canvasElement.addEventListener('touchmove', (e) => {
      e.preventDefault();
      isDragging = true;
    }, { passive: false });

    canvasElement.addEventListener('touchend', (e) => {
      e.preventDefault();
      isTouch = false;
      isDragging = false;
      mouseIdleTime = 0;
    }, { passive: false });

    // 初期カメラ位置を設定
    let x = p.cos(rotationAngle) * cameraRadius;
    let z = p.sin(rotationAngle) * cameraRadius;
    p.camera(x, cameraHeight, z, 0, 0, 0, 0, 1, 0);

    // 初期マウス位置を設定
    lastMouseX = p.mouseX;
    lastMouseY = p.mouseY;
  };

  // ウィンドウリサイズ時の処理
  p.windowResized = () => {
    calculateCanvasSize();
    p.resizeCanvas(canvasWidth, canvasHeight);
  };

  p.draw = () => {
    p.background(0, 0, 0);
    p.ambientLight(100);
    p.directionalLight(255, 255, 255, -1, 0.5, -1);

    // マウス操作の検出（デスクトップ用）
    if (!isTouch && p.mouseIsPressed) {
      if (p.mouseX !== lastMouseX || p.mouseY !== lastMouseY) {
        isDragging = true;
        autoRotate = false;
        mouseIdleTime = 0;
      }
    } else if (!isTouch && !p.mouseIsPressed) {
      if (isDragging) {
        isDragging = false;
        mouseIdleTime = 0;
      }
    }

    // マウスが動いていない時間をカウント
    if (!autoRotate && !isDragging && !isTouch) {
      mouseIdleTime++;
      if (mouseIdleTime > maxIdleTime) {
        autoRotate = true;
      }
    }

    // 自動回転の実行
    if (autoRotate && !isDragging && !isTouch) {
      rotationAngle += rotationSpeed;
      let x = p.cos(rotationAngle) * cameraRadius;
      let z = p.sin(rotationAngle) * cameraRadius;
      p.camera(x, cameraHeight, z, 0, 0, 0, 0, 1, 0);
    }

    // インタラクション時のみorbitControlを有効にする
    if (isDragging || (!autoRotate && !isTouch)) {
      p.orbitControl();
    }

    drawRoom();
    drawFurniture();

    if (!isTouch) {
      lastMouseX = p.mouseX;
      lastMouseY = p.mouseY;
    }
  };

  const drawRoom = () => {
    // Floor
    p.push();
    p.translate(0, wallHeight / 2, 0);
    p.rotateX(p.PI / 2);
    p.noFill();
    p.stroke(255);
    p.plane(roomSize, roomSize);
    p.pop();

    // Ceiling
    p.push();
    p.translate(0, -wallHeight / 2, 0);
    p.rotateX(p.PI / 2);
    p.noFill();
    p.stroke(255);
    p.plane(roomSize, roomSize);
    p.pop();

    // Left wall
    p.push();
    p.translate(-roomSize / 2, 0, 0);
    p.rotateY(p.PI / 2);
    p.noFill();
    p.stroke(255);
    p.plane(roomSize, wallHeight);
    p.pop();

    // Right wall
    p.push();
    p.translate(roomSize / 2, 0, 0);
    p.rotateY(-p.PI / 2);
    p.noFill();
    p.stroke(255);
    p.plane(roomSize, wallHeight);
    p.pop();

    // Back wall
    p.push();
    p.translate(0, 0, -roomSize / 2);
    p.noFill();
    p.stroke(255);
    p.plane(roomSize, wallHeight);
    p.pop();

    // Front wall (with door opening)
    p.push();
    p.translate(0, 0, roomSize / 2);
    p.noFill();
    p.stroke(255);
    p.push();
    p.translate(-roomSize / 4, 0, 0);
    p.plane(roomSize / 2, wallHeight);
    p.pop();
    p.push();
    p.translate(roomSize / 4, 0, 0);
    p.plane(roomSize / 2, wallHeight);
    p.pop();
    p.push();
    p.translate(0, -wallHeight / 3, 0);
    p.plane(roomSize / 2, wallHeight / 3);
    p.pop();
    p.pop();
  };

  const drawFurniture = () => {
    // Table
    p.push();
    p.translate(-80, 60, -50);
    p.noFill();
    p.stroke(255);
    p.push();
    p.translate(0, -20, 0);
    p.box(120, 10, 60);
    p.pop();
    for (let x = -50; x <= 50; x += 100) {
      for (let z = -25; z <= 25; z += 50) {
        p.push();
        p.translate(x, 15, z);
        p.box(8, 50, 8);
        p.pop();
      }
    }
    p.pop();

    // Chair
    p.push();
    p.translate(-80, 80, 20);
    p.noFill();
    p.stroke(255);
    p.push();
    p.translate(0, -10, 0);
    p.box(40, 5, 40);
    p.pop();
    p.push();
    p.translate(0, -30, -15);
    p.box(40, 35, 5);
    p.pop();
    for (let x = -15; x <= 15; x += 30) {
      for (let z = -15; z <= 15; z += 30) {
        p.push();
        p.translate(x, 15, z);
        p.box(5, 30, 5);
        p.pop();
      }
    }
    p.pop();

    // Bookshelf
    p.push();
    p.translate(150, 0, -150);
    p.noFill();
    p.stroke(255);
    p.box(80, 200, 30);
    for (let i = 0; i < 4; i++) {
      p.push();
      p.translate(0, -75 + i * 50, 0);
      p.box(75, 3, 28);
      p.pop();
    }
    for (let shelf = 0; shelf < 4; shelf++) {
      for (let book = 0; book < 6; book++) {
        p.push();
        p.translate(-30 + book * 12, -60 + shelf * 50, 5);
        p.box(10, 25, 15);
        p.pop();
      }
    }
    p.pop();

    // Lamp
    p.push();
    p.translate(50, -80, 80);
    p.noFill();
    p.stroke(255);
    p.cylinder(20, 10);
    p.push();
    p.translate(0, -30, 0);
    p.cylinder(3, 60);
    p.pop();
    p.push();
    p.translate(0, -70, 0);
    p.cone(25, 30);
    p.pop();
    p.pop();
  };
};

  return (
    <div className="min-h-screen bg-white text-gray-900 font-thin overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="font-light text-xl tracking-wide">UuU</div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {navigationItems.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className={`text-sm font-light tracking-wide transition-all duration-300 hover:text-gray-600 ${
                  activeSection === id ? 'text-black border-b border-black' : 'text-gray-500'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100">
            {navigationItems.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className="w-full px-6 py-3 text-left flex items-center space-x-3 hover:bg-gray-50 transition-colors"
              >
                <Icon size={18} className="text-gray-400" />
                <span className="font-light">{label}</span>
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-6 bg-gradient-to-br from-white to-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <div className="animate-fadeInUp space-y-12">
            <div className="max-w-5xl mx-auto">
              <div className="flex justify-center">
                <div className="touch-none">
                  <P5Sketch
                    width={800}
                    height={600}
                    className="rounded-lg border border-gray-200 shadow-sm max-w-full h-auto"
                    sketch={sketch}
                  />
                </div>
              </div>
            </div>

            <button
              onClick={() => scrollToSection('about')}
              className="inline-flex items-center space-x-2 text-gray-600 hover:text-black transition-colors duration-300"
            >
              <span className="font-light tracking-wide">Discover More</span>
              <ChevronDown size={20} className="animate-bounce" />
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-thin tracking-wider mb-16 text-center">About</h2>
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <h3 className="text-2xl font-light tracking-wide">Akira MURAKAMI / 村上 聡</h3>
              <p className="text-gray-600 font-light leading-relaxed text-lg">
                I am a master’s student at the ICD Lab, Tohoku University. I’m interested in the intersection of Architecture and Human-Computer Interaction (HCI).
              </p>
            </div>
            <div className="relative">
            <div className="aspect-square rounded-lg overflow-hidden">
              <Image
                src="/akira.jpg"
                alt="Profile photo"
                fill
                className="object-cover"
              />
            </div>
            </div>
        </div>
      </div>
    </section>

      {/* Education Section */}
      <section id="education" className="py-20 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-thin tracking-wider mb-16 text-center">Education</h2>
          <div className="space-y-12">
            <div className="border-l-2 border-gray-200 pl-8 pb-8">
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-3 h-3 bg-black rounded-full -ml-10 border-4 border-white"></div>
                <span className="text-sm text-gray-500 font-light">October 2024 - Present</span>
              </div>
              <h3 className="text-xl font-light mb-2">Master of Infomation Science</h3>
              <p className="text-gray-600 font-light">東北大学大学院 情報科学研究科</p>
              <p className="text-gray-500 text-sm mt-2 font-light">Advisor: Yoshifumi Kitamura, Kazuyuki Fujita</p>
            </div>
            <div className="border-l-2 border-gray-200 pl-8">
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-3 h-3 bg-gray-400 rounded-full -ml-10 border-4 border-white"></div>
                <span className="text-sm text-gray-500 font-light">April 2021 - September 2024</span>
              </div>
              <h3 className="text-xl font-light mb-2">Bachelor of Engineering</h3>
              <p className="text-gray-600 font-light">東北大学 工学部 電子情報物理工学科</p>
              <p className="text-gray-500 text-sm mt-2 font-light">Advisor: Yoshifumi Kitamura, Kazuyuki Fujita</p>
            </div>
          </div>
        </div>
      </section>

      {/* Work Experiences Section */}
      <section id="work" className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-thin tracking-wider mb-16 text-center">Work Experiences</h2>
          <div className="space-y-12">
            <div className="group hover:bg-gray-50 p-6 rounded-lg transition-all duration-300">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-light mb-2">Engineer Intern</h3>
                  <p className="text-gray-600 font-light">Adansons, Inc.</p>
                </div>
                <span className="text-sm text-gray-500 font-light">October 2021 - Present</span>
              </div>
              <p className="text-gray-600 font-light leading-relaxed">
                触覚技術を活用した技能伝達に関する研究プロジェクトに参加し，企画から展示会向けのソフトウェアの開発までを担当しました．
              </p>
              <ul className="list-disc list-inside ml-6">
                  <li>iOS App Dev (Swift UI / AWS)</li>
                  <li>VR App Dev (Unity)</li>
                  <li>Web App Dev (Next.js / MUI / AWS)</li>
              </ul>
            </div>

            <div className="group hover:bg-gray-50 p-6 rounded-lg transition-all duration-300">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-light mb-2">Research Intern</h3>
                  <p className="text-gray-600 font-light">Bridge UI, Inc. </p>
                </div>
                <span className="text-sm text-gray-500 font-light">April 2021 - Present</span>
              </div>
              <p className="text-gray-600 font-light leading-relaxed">
                研究用のモバイルアプリケーションおよび数学教育向けのWebアプリケーションの開発を経験しました．
              </p>
              <ul className="list-disc list-inside ml-6">
                  <li>iOS App Dev (Swift UI)</li>
                  <li>Web App Dev (Vue.js / Vuetify / Firebase)</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Publications Section */}
      <section id="publications" className="py-20 px-6 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-thin tracking-wider mb-16 text-center">
          Publications
        </h2>

        <h3 className="text-xl font-light mb-6">
          国際学術雑誌（査読あり）
        </h3>
        <PublicationList pubs={intlJournals} />

        <h3 className="text-xl font-light mb-6">
          国内学術雑誌（査読あり）
        </h3>
        <PublicationList pubs={domesticJournals} />

        <h3 className="text-xl font-light mb-6">
          国際会議発表（査読あり）
        </h3>
        <PublicationList pubs={intlConferences} />

        <h3 className="text-xl font-light mb-6">
          国内会議デモ・ポスター発表，研究会・全国大会発表（査読なし）
        </h3>
        <PublicationList pubs={domesticConferences} />
      </div>
    </section>

      {/* Works Section */}

      <section id="works" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-thin tracking-wider mb-16 text-center">Works</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {worksData.map((work) => (
              <WorkCard key={work.id} work={work} />
            ))}
          </div>
        </div>
      </section>


    {/* Awards Section */}
    <section id="awards" className="py-20 px-6 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-thin tracking-wider mb-16 text-center">Awards</h2>
        <ul className="space-y-4 text-gray-600 font-light leading-relaxed list-disc list-inside">
          <li>
            Interverse Virtual Reality Challenge (IVRC) 2025「豆|頁：なんかきられてももどるやつ」
            <ul className="list-disc list-inside ml-6">
              <li>
                  SEED Stageにおいて Unity賞，CRI・ミドルウェア賞，観客賞　受賞．
              </li>
              <li>
                LEAP Stage進出（書類審査を通過した20作品中10作品が審査員により選出）．
              </li>
              <li>
                メディア：<a
                  href="https://criware.info/ivrc-2025-seed/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  https://criware.info/ivrc-2025-seed/
                </a>
              </li>
            </ul>
          </li>

          <li>
            経済産業省 未踏的な地方の若手人材発掘育成支援事業補助金AKATSUKIプロジェクト - MiTOHOKU Program 2期採択
            <div>
              <a
                href="https://mitohoku.jp/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                https://mitohoku.jp/
              </a>
            </div>
          </li>

          <li>
            東北大学ビジネスアイデアコンテスト 2021 最優秀賞
            <div>
              <a
                href="https://www.tohoku.ac.jp/japanese/2021/12/press20211222-01-idea.html"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                https://www.tohoku.ac.jp/japanese/2021/12/press20211222-01-idea.html
              </a>
            </div>
          </li>

          <li>
            Open Hack U 2022 Spring ONLINE 最優秀賞
            <div>
              <a
                href="https://hacku.yahoo.co.jp/hacku2022spring_online/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                https://hacku.yahoo.co.jp/hacku2022spring_online/
              </a>
            </div>
          </li>

          <li>第21回全国中学高校 Webコンテスト 高校生の部 セミファイナリスト 2020.2</li>
          <li>高校生科学技術チャレンジ Jsec2018 入選 2018.12</li>

          <li>
            武蔵野大学数理工学コンテスト 奨励賞 2019.11
            <div>
              <a
                href="https://prod-files-secure.s3.us-west-2.amazonaws.com/b7c9c44c-90c8-4194-bff1-3b351c1a5aeb/a6c945c5-5372-4dda-a71a-ede85a72b9ec/musashino_2019.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                musashino_2019.pdf
              </a>
            </div>
          </li>

          <li>
            柏木 麻里子, 種村 圭依人, <strong>村上 聡</strong>, 海本 晋太朗, 今西 敏都,
            「数学的活動によって創造的な人を育てる方法の研究とその方法のアジア圏での普及」,
            SGH甲子園, 日本語優秀賞 2019.3
          </li>

          <li>サイエンスキャッスル 優秀賞 2018.2</li>
        </ul>
      </div>
    </section>


      {/* Misc Section */}
      <section id="misc" className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-thin tracking-wider mb-16 text-center">Misc.</h2>
          <ul className="space-y-4 text-gray-600 font-light leading-relaxed list-disc list-inside">
          <li>
            TOEIC L&R score: 855 (October, 2023)
          </li>

          <li>
            WISS2024 学生ボランティア
          </li>
        </ul>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-thin tracking-wider mb-16 text-center">Contact</h2>
          <div className="text-center">

            <div className="mb-12">
              <h3 className="text-xl font-light mb-6">Email</h3>
              <div className="text-2xl font-light text-black" >
                murakami.akira.q2 [at] dc.tohoku.ac.jp
              </div>
            </div>

            <div>
              <h3 className="text-xl font-light mb-8">Follow Me</h3>
              <div className="flex justify-center space-x-8">
                <a
                  href="https://x.com/_akira_murakami"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col items-center space-y-3 p-4 hover:bg-white rounded-lg transition-all duration-300"
                >
                  <div className="p-4 border border-gray-200 rounded-full group-hover:border-gray-400 transition-colors">
                    <FaXTwitter size={24} className="text-gray-600 group-hover:text-black transition-colors" />
                  </div>
                  <span className="text-sm font-light text-gray-600 group-hover:text-black transition-colors">X</span>
                </a>

                <a
                  href="https://www.linkedin.com/in/akira-murakami-861ba0298/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col items-center space-y-3 p-4 hover:bg-white rounded-lg transition-all duration-300"
                >
                  <div className="p-4 border border-gray-200 rounded-full group-hover:border-gray-400 transition-colors">
                    <FaLinkedin size={24} className="text-gray-600 group-hover:text-black transition-colors" />
                  </div>
                  <span className="text-sm font-light text-gray-600 group-hover:text-black transition-colors">LinkedIn</span>
                </a>

                <a
                  href="https://www.facebook.com/set02akira/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col items-center space-y-3 p-4 hover:bg-white rounded-lg transition-all duration-300"
                >
                  <div className="p-4 border border-gray-200 rounded-full group-hover:border-gray-400 transition-colors">
                    <FaFacebook size={24} className="text-gray-600 group-hover:text-black transition-colors" />
                  </div>
                  <span className="text-sm font-light text-gray-600 group-hover:text-black transition-colors">Facebook</span>
                </a>

                <a
                  href="https://github.com/Set022525"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col items-center space-y-3 p-4 hover:bg-white rounded-lg transition-all duration-300"
                >
                  <div className="p-4 border border-gray-200 rounded-full group-hover:border-gray-400 transition-colors">
                    <FaGithub size={24} className="text-gray-600 group-hover:text-black transition-colors"/>
                  </div>
                  <span className="text-sm font-light text-gray-600 group-hover:text-black transition-colors">GitHub</span>
                </a>



              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-500 font-thin tracking-wide">
            © 2025 Akira Murakami. All rights reserved.
          </p>
        </div>
      </footer>

      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeInUp {
          animation: fadeInUp 1s ease-out;
        }

        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </div>
  );
}
