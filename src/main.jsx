import React, { useEffect, useMemo, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import "../styles.css";

const iconNames = {
  home: "house",
  school: "school",
  docs: "file-text",
  people: "users-round",
  news: "newspaper",
  video: "youtube",
  contact: "mail",
  search: "search",
  target: "goal",
  shield: "shield-check",
  play: "circle-play",
};

function Icon({ name, className = "" }) {
  const icon = iconNames[name] || iconNames.target;
  return (
    <span
      className={`ui-icon ${className}`}
      style={{ "--icon-url": `url("https://api.iconify.design/lucide/${icon}.svg")` }}
      aria-hidden="true"
    />
  );
}

const earlyStandards = [
  {
    id: "standard-1",
    title: "ผลลัพธ์คุณภาพของเด็กปฐมวัย",
    count: "5 ตัวชี้วัด",
    items: [
      "เด็กเจริญเติบโตสมวัย สุขภาพแข็งแรง และมีพัฒนาการด้านการเคลื่อนไหว",
      "เด็กมีพัฒนาการด้านสติปัญญา เรียนรู้และสร้างสรรค์",
      "เด็กมีพัฒนาการด้านภาษาและการสื่อสาร",
      "เด็กมีพัฒนาการด้านอารมณ์และจิตใจ",
      "เด็กมีพัฒนาการด้านสังคมและคุณธรรม",
    ],
  },
  {
    id: "standard-2",
    title: "การบริหารจัดการสถานพัฒนาเด็กปฐมวัย",
    count: "10 ตัวชี้วัด",
    items: [
      "วิสัยทัศน์ พันธกิจ และค่านิยมของสถานศึกษาหรือสถานพัฒนาเด็กปฐมวัย",
      "กลยุทธ์และเป้าหมายของสถานศึกษาหรือสถานพัฒนาเด็กปฐมวัย",
      "ผู้บริหารสถานศึกษาหรือสถานพัฒนาเด็กปฐมวัยมีภาวะผู้นำทางวิชาการ และบริหารจัดการด้วยหลักธรรมาภิบาล",
      "การพัฒนาวิชาชีพผู้บริหาร ครูหรือผู้ดูแลเด็ก และบุคลากรทางการศึกษา",
      "การนิเทศครูหรือผู้ดูแลเด็ก และการประเมินการปฏิบัติงานอย่างเป็นระบบ",
      "การใช้สื่อสนับสนุนการจัดประสบการณ์การเรียนรู้อย่างเพียงพอและปลอดภัย",
      "การจัดสภาพแวดล้อม แหล่งเรียนรู้ที่มีความมั่นคงและปลอดภัย",
      "สวัสดิการ สวัสดิภาพ แนวทางการป้องกันโรค อุบัติภัย และภัยพิบัติ",
      "ระบบและกระบวนการช่วยเหลือเด็ก",
      "การเสริมสร้างเครือข่ายผู้ปกครอง องค์กร และชุมชน เพื่อความร่วมมือในการสนับสนุนการจัดการเรียนรู้และพัฒนาเด็ก",
    ],
  },
  {
    id: "standard-3",
    title: "การพัฒนาคุณภาพการจัดประสบการณ์การเรียนรู้เด็กปฐมวัย",
    count: "3 ตัวชี้วัด",
    items: [
      "การออกแบบหลักสูตรและแผนการจัดการเรียนรู้ที่เสริมสร้างสมรรถนะและคุณลักษณะที่พึงประสงค์",
      "การจัดกิจกรรมพัฒนาคุณลักษณะพึงประสงค์ที่เหมาะสมกับวัย",
      "ครูหรือผู้ดูแลเด็กประเมินพัฒนาการของเด็กอย่างเป็นระบบและต่อเนื่อง",
    ],
  },
];

const basicStandards = [
  {
    id: "standard-1",
    title: "ผลลัพธ์ของการเรียนรู้",
    count: "3 ตัวชี้วัด",
    items: [
      "ผู้เรียนมีสมรรถนะตามหลักสูตรสถานศึกษา",
      "ผู้เรียนมีคุณลักษณะที่พึงประสงค์ตามหลักสูตรสถานศึกษา",
      "ผู้เรียนสามารถนำตนเองในการเรียนรู้",
    ],
  },
  {
    id: "standard-2",
    title: "การพัฒนาคุณภาพการบริหารจัดการสถานศึกษา",
    count: "10 ตัวชี้วัด",
    items: [
      "วิสัยทัศน์ พันธกิจ และค่านิยมของสถานศึกษา",
      "นโยบาย ทิศทาง กลยุทธ์ และแผนงานสอดคล้องกับวิสัยทัศน์และพันธกิจ",
      "ผู้บริหารสถานศึกษามีภาวะผู้นำทางวิชาการและบริหารจัดการด้วยหลักธรรมาภิบาล",
      "แผนงานและการดำเนินงานด้านการพัฒนาครูและบุคลากรทางการศึกษา",
      "กระบวนการนิเทศการปฏิบัติงานของครูและบุคลากรทางการศึกษาอย่างเป็นระบบ",
      "การใช้สื่อ อุปกรณ์ ระบบเทคโนโลยีเพื่อสนับสนุนการจัดการศึกษา",
      "การจัดสภาพแวดล้อม อาคารสถานที่ ปลอดภัยและถูกสุขลักษณะ",
      "สวัสดิการ สวัสดิภาพ แนวทางการป้องกันโรค อุบัติภัย ภัยพิบัติ",
      "ระบบและกระบวนการช่วยเหลือผู้เรียน",
      "การเสริมสร้างเครือข่ายผู้ปกครอง องค์กร และชุมชน เพื่อความร่วมมือในการสนับสนุนการจัดการเรียนรู้และพัฒนาผู้เรียน",
    ],
  },
  {
    id: "standard-3",
    title: "การพัฒนาคุณภาพการจัดการเรียนรู้",
    count: "3 ตัวชี้วัด",
    items: [
      "การออกแบบหลักสูตรและแผนการจัดการเรียนรู้ที่เสริมสร้างสมรรถนะและคุณลักษณะที่พึงประสงค์",
      "การจัดกิจกรรมการเรียนรู้ที่เสริมสร้างสมรรถนะและคุณลักษณะที่พึงประสงค์",
      "ครูวัดและประเมินผลการเรียนรู้ของผู้เรียนอย่างเป็นระบบและต่อเนื่อง",
    ],
  },
];

const reelItems = [
  {
    quote: "การประกันคุณภาพภายนอก รอบที่ 5 คือโอกาสในการจัดข้อมูลให้เห็นคุณค่าของการพัฒนาผู้เรียนอย่างเป็นระบบ",
    author: "โรงเรียนบ้านน้ำพร",
    image: "/assets/np-logo.png",
  },
  {
    quote: "แยกหลักฐานตามระดับปฐมวัยและขั้นพื้นฐาน ช่วยให้คณะทำงานตรวจสอบความครบถ้วนของตัวชี้วัดได้ชัดเจน",
    author: "งานประกันคุณภาพภายในสถานศึกษา",
    image: "/assets/onesqa-logo.png",
  },
  {
    quote: "เว็บไซต์กลางทำให้ครู บุคลากร ผู้ปกครอง และต้นสังกัด เข้าถึงข้อมูลสำคัญได้สะดวกและเป็นปัจจุบัน",
    author: "ผู้ดูแลเว็บไซต์ นายนิรุทธิ์ เสวะนา",
    image: "/assets/activity-1.png",
  },
];

const profileTestimonials = [
  {
    name: "โรงเรียนบ้านน้ำพร",
    title: "ระบบเตรียมรับการประกันคุณภาพภายนอก รอบที่ 5",
    description: "ศูนย์รวมข้อมูล มาตรฐาน ตัวชี้วัด เอกสารหลักฐาน และข่าวสารสำหรับคณะครู บุคลากร ผู้ประเมิน และผู้เกี่ยวข้องทุกฝ่าย",
    image: "/assets/hero-profile.png",
  },
  {
    name: "การศึกษาปฐมวัย",
    title: "3 มาตรฐาน 18 ตัวชี้วัด",
    description: "รวบรวมเอกสารผลลัพธ์คุณภาพเด็ก การบริหารจัดการ และการจัดประสบการณ์การเรียนรู้ พร้อมปุ่มเชื่อมโยงหลักฐานประกอบแต่ละตัวชี้วัด",
    image: "/assets/doc-early.svg",
  },
  {
    name: "การศึกษาขั้นพื้นฐาน",
    title: "3 มาตรฐาน 16 ตัวชี้วัด",
    description: "รวบรวมเอกสารผลลัพธ์การเรียนรู้ การบริหารจัดการ และการจัดการเรียนรู้ เพื่อใช้ติดตามความพร้อมก่อนรับการประเมิน",
    image: "/assets/doc-basic.svg",
  },
];

const documentGroups = [
  {
    id: "early-docs",
    level: "ปฐมวัย",
    title: "เอกสารประกอบระดับการศึกษาปฐมวัย",
    image: "/assets/doc-early.svg",
    accent: "gold",
    standards: [
      {
        title: "มาตรฐานที่ 1 ผลลัพธ์คุณภาพของเด็กปฐมวัย",
        indicators: [
          ["พัฒนาการด้านร่างกายและสุขภาพ", ["บันทึกน้ำหนักส่วนสูง", "แบบประเมินพัฒนาการ", "ภาพกิจกรรมส่งเสริมสุขภาพ"]],
          ["พัฒนาการด้านสติปัญญาและการเรียนรู้", ["แฟ้มผลงานเด็ก", "แผนจัดประสบการณ์", "ชิ้นงาน/ภาพกิจกรรม"]],
          ["พัฒนาการด้านภาษาและการสื่อสาร", ["แบบบันทึกการสังเกต", "กิจกรรมเล่านิทาน", "ผลงานการสื่อสารของเด็ก"]],
        ],
      },
      {
        title: "มาตรฐานที่ 2 การบริหารจัดการสถานพัฒนาเด็กปฐมวัย",
        indicators: [
          ["วิสัยทัศน์ พันธกิจ และแผนพัฒนา", ["แผนพัฒนาคุณภาพ", "แผนปฏิบัติการ", "รายงานผลโครงการ"]],
          ["ระบบดูแลช่วยเหลือและความปลอดภัย", ["แผนเผชิญเหตุ", "ทะเบียนสุขภาพ", "รายงานการดูแลช่วยเหลือเด็ก"]],
        ],
      },
      {
        title: "มาตรฐานที่ 3 การจัดประสบการณ์การเรียนรู้",
        indicators: [
          ["หลักสูตรและแผนประสบการณ์", ["หลักสูตรปฐมวัย", "หน่วยการเรียนรู้", "บันทึกหลังจัดประสบการณ์"]],
          ["การวัดและประเมินพัฒนาการ", ["แบบประเมินรายบุคคล", "สรุปผลพัฒนาการ", "รายงานต่อผู้ปกครอง"]],
        ],
      },
    ],
  },
  {
    id: "basic-docs",
    level: "ขั้นพื้นฐาน",
    title: "เอกสารประกอบระดับการศึกษาขั้นพื้นฐาน",
    image: "/assets/doc-basic.svg",
    accent: "blue",
    standards: [
      {
        title: "มาตรฐานที่ 1 ผลลัพธ์ของการเรียนรู้",
        indicators: [
          ["สมรรถนะตามหลักสูตรสถานศึกษา", ["ผลสัมฤทธิ์ทางการเรียน", "รายงาน RT/NT/O-NET", "แฟ้มสะสมงานผู้เรียน"]],
          ["คุณลักษณะที่พึงประสงค์", ["แบบประเมินคุณลักษณะ", "กิจกรรมคุณธรรม", "บันทึกพฤติกรรมผู้เรียน"]],
          ["การนำตนเองในการเรียนรู้", ["โครงงานนักเรียน", "ผลงานนวัตกรรม", "บันทึกการเรียนรู้รายบุคคล"]],
        ],
      },
      {
        title: "มาตรฐานที่ 2 การบริหารจัดการสถานศึกษา",
        indicators: [
          ["แผนงานสอดคล้องวิสัยทัศน์", ["แผนพัฒนาคุณภาพ", "แผนปฏิบัติการ", "รายงาน SAR"]],
          ["การพัฒนาครูและบุคลากร", ["แผน ID Plan", "รายงานอบรม", "PLC/นิเทศภายใน"]],
          ["สภาพแวดล้อมและความปลอดภัย", ["แผนความปลอดภัย", "บันทึกตรวจอาคาร", "ภาพกิจกรรมซ้อมแผน"]],
        ],
      },
      {
        title: "มาตรฐานที่ 3 การจัดการเรียนรู้",
        indicators: [
          ["ออกแบบหลักสูตรและแผนการจัดการเรียนรู้", ["หลักสูตรสถานศึกษา", "แผนการจัดการเรียนรู้", "สื่อ/นวัตกรรมการสอน"]],
          ["การวัดและประเมินผลอย่างเป็นระบบ", ["ข้อสอบ/เครื่องมือวัด", "รายงานผลการเรียน", "การวิเคราะห์ผู้เรียนรายบุคคล"]],
        ],
      },
    ],
  },
];

const spotlightItems = {
  newsletter: [
    {
      title: "จดหมายข่าวการเตรียมความพร้อม สมศ. รอบที่ 5",
      desc: "ตัวอย่างพื้นที่เผยแพร่จดหมายข่าวของโรงเรียน อัตราส่วน A4 คลิกเพื่อดูขนาดใหญ่",
      image: "/assets/newsletter-a4.svg",
      ratio: "a4",
    },
  ],
  activity: [
    {
      title: "ภาพกิจกรรมพัฒนาผู้เรียนและชุมชนแห่งการเรียนรู้",
      desc: "พื้นที่ภาพกิจกรรมอัตราส่วน 4:3 พร้อมข้อความกำกับใต้ภาพ",
      image: "/assets/activity-4x3.svg",
      ratio: "four-three",
    },
    {
      title: "กิจกรรมส่งเสริมสุขภาพและความปลอดภัย",
      desc: "รวบรวมภาพหลักฐานประกอบระบบดูแลช่วยเหลือผู้เรียน",
      image: "/assets/activity-2.png",
      ratio: "four-three",
    },
  ],
};

const evidenceBase = {
  earlyChild: [
    "บันทึกน้ำหนัก ส่วนสูง สุขภาพ และพัฒนาการรายบุคคล",
    "แบบประเมินพัฒนาการ/แบบสังเกตพฤติกรรมเด็ก",
    "แฟ้มสะสมผลงาน ชิ้นงาน และภาพกิจกรรมของเด็ก",
    "รายงานโครงการหรือกิจกรรมที่เกี่ยวข้องกับตัวชี้วัด",
  ],
  earlyManagement: [
    "แผนพัฒนาคุณภาพการศึกษา/แผนปฏิบัติการประจำปี",
    "รายงานการประเมินตนเองของสถานศึกษา (SAR)",
    "คำสั่งแต่งตั้ง บันทึกการประชุม และรายงานผลการดำเนินงาน",
    "หลักฐานภาพกิจกรรม/ข้อมูลสารสนเทศ/Best Practice ที่เกี่ยวข้อง",
  ],
  earlyLearning: [
    "หลักสูตรสถานศึกษาระดับปฐมวัยและแผนการจัดประสบการณ์",
    "บันทึกหลังการจัดประสบการณ์และสื่อการเรียนรู้",
    "แบบประเมินพัฒนาการรายบุคคลและรายงานผลต่อผู้ปกครอง",
    "ผลงานเด็ก ภาพกิจกรรม และร่องรอยการมีส่วนร่วมของผู้ปกครอง",
  ],
  basicLearner: [
    "ผลสัมฤทธิ์/ผลการอ่านเขียน/ผลประเมินสมรรถนะตามหลักสูตร",
    "แฟ้มสะสมงาน ชิ้นงาน โครงงาน และผลงานเชิงประจักษ์ของผู้เรียน",
    "แบบประเมินคุณลักษณะอันพึงประสงค์และพฤติกรรมผู้เรียน",
    "รายงานผลการพัฒนาผู้เรียนรายบุคคลและข้อมูลย้อนหลังตามเป้าหมาย",
  ],
  basicManagement: [
    "แผนพัฒนาคุณภาพการศึกษา แผนปฏิบัติการ และรายงานผลโครงการ",
    "รายงาน SAR/ผลประกันคุณภาพภายใน/ข้อเสนอแนะจากการประเมินที่ผ่านมา",
    "คำสั่งแต่งตั้ง บันทึกการประชุม ระบบข้อมูลสารสนเทศ และรายงานนิเทศ",
    "หลักฐานความปลอดภัย เครือข่ายผู้ปกครอง ชุมชน และ Best Practice",
  ],
  basicTeaching: [
    "หลักสูตรสถานศึกษา โครงสร้างรายวิชา และแผนการจัดการเรียนรู้",
    "สื่อ นวัตกรรม ใบงาน เครื่องมือวัดผล และบันทึกหลังสอน",
    "รายงานผลการวัดและประเมินผล/ข้อมูลผู้เรียนรายบุคคล",
    "PLC นิเทศชั้นเรียน ภาพกิจกรรม และการสะท้อนผลเพื่อพัฒนาผู้เรียน",
  ],
};

const makeIndicator = (code, title, docs) => [title, docs, code];

const documentGroupsV2 = [
  {
    id: "early-docs",
    level: "ปฐมวัย",
    title: "เอกสารประกอบระดับการศึกษาปฐมวัย",
    image: "/assets/doc-early.svg",
    accent: "gold",
    standards: [
      {
        title: "มาตรฐานที่ 1 ผลลัพธ์คุณภาพของเด็กปฐมวัย",
        indicators: [
          makeIndicator("1.1", "เด็กเจริญเติบโตสมวัย สุขภาพแข็งแรง และมีพัฒนาการด้านการเคลื่อนไหว", evidenceBase.earlyChild),
          makeIndicator("1.2", "เด็กมีพัฒนาการด้านสติปัญญา เรียนรู้และสร้างสรรค์", evidenceBase.earlyChild),
          makeIndicator("1.3", "เด็กมีพัฒนาการด้านภาษาและการสื่อสาร", evidenceBase.earlyChild),
          makeIndicator("1.4", "เด็กมีพัฒนาการด้านอารมณ์และจิตใจ", evidenceBase.earlyChild),
          makeIndicator("1.5", "เด็กมีพัฒนาการด้านสังคมและคุณธรรม", evidenceBase.earlyChild),
        ],
      },
      {
        title: "มาตรฐานที่ 2 การบริหารจัดการสถานพัฒนาเด็กปฐมวัย",
        indicators: [
          makeIndicator("2.1", "วิสัยทัศน์ พันธกิจ และค่านิยมของสถานศึกษาหรือสถานพัฒนาเด็กปฐมวัย", evidenceBase.earlyManagement),
          makeIndicator("2.2", "กลยุทธ์และเป้าหมายของสถานศึกษาหรือสถานพัฒนาเด็กปฐมวัย", evidenceBase.earlyManagement),
          makeIndicator("2.3", "ผู้บริหารมีภาวะผู้นำทางวิชาการและบริหารจัดการด้วยหลักธรรมาภิบาล", evidenceBase.earlyManagement),
          makeIndicator("2.4", "การพัฒนาวิชาชีพผู้บริหาร ครูหรือผู้ดูแลเด็ก และบุคลากรทางการศึกษา", evidenceBase.earlyManagement),
          makeIndicator("2.5", "การนิเทศครูหรือผู้ดูแลเด็ก และการประเมินการปฏิบัติงานอย่างเป็นระบบ", evidenceBase.earlyManagement),
          makeIndicator("2.6", "การใช้สื่อสนับสนุนการจัดประสบการณ์การเรียนรู้อย่างเพียงพอและปลอดภัย", evidenceBase.earlyManagement),
          makeIndicator("2.7", "การจัดสภาพแวดล้อม แหล่งเรียนรู้ที่มีความมั่นคงและปลอดภัย", evidenceBase.earlyManagement),
          makeIndicator("2.8", "สวัสดิการ สวัสดิภาพ แนวทางการป้องกันโรค อุบัติภัย และภัยพิบัติ", evidenceBase.earlyManagement),
          makeIndicator("2.9", "ระบบและกระบวนการช่วยเหลือเด็ก", evidenceBase.earlyManagement),
          makeIndicator("2.10", "การเสริมสร้างเครือข่ายผู้ปกครอง องค์กร และชุมชน เพื่อสนับสนุนการจัดประสบการณ์และพัฒนาเด็ก", evidenceBase.earlyManagement),
        ],
      },
      {
        title: "มาตรฐานที่ 3 การพัฒนาคุณภาพการจัดประสบการณ์การเรียนรู้เด็กปฐมวัย",
        indicators: [
          makeIndicator("3.1", "การออกแบบหลักสูตรและแผนการจัดประสบการณ์การเรียนรู้ที่เสริมสร้างพัฒนาการและคุณลักษณะที่พึงประสงค์", evidenceBase.earlyLearning),
          makeIndicator("3.2", "การจัดกิจกรรมพัฒนาคุณลักษณะที่พึงประสงค์เหมาะสมกับวัย", evidenceBase.earlyLearning),
          makeIndicator("3.3", "ครูหรือผู้ดูแลเด็กประเมินพัฒนาการของเด็กอย่างเป็นระบบและต่อเนื่อง", evidenceBase.earlyLearning),
        ],
      },
    ],
  },
  {
    id: "basic-docs",
    level: "ขั้นพื้นฐาน",
    title: "เอกสารประกอบระดับการศึกษาขั้นพื้นฐาน",
    image: "/assets/doc-basic.svg",
    accent: "blue",
    standards: [
      {
        title: "มาตรฐานที่ 1 ผลลัพธ์ของการเรียนรู้",
        indicators: [
          makeIndicator("1.1", "ผู้เรียนมีสมรรถนะตามหลักสูตรสถานศึกษา", evidenceBase.basicLearner),
          makeIndicator("1.2", "ผู้เรียนมีคุณลักษณะที่พึงประสงค์ตามหลักสูตรสถานศึกษา", evidenceBase.basicLearner),
          makeIndicator("1.3", "ผู้เรียนสามารถนำตนเองในการเรียนรู้", evidenceBase.basicLearner),
        ],
      },
      {
        title: "มาตรฐานที่ 2 การพัฒนาคุณภาพการบริหารจัดการสถานศึกษา",
        indicators: [
          makeIndicator("2.1", "วิสัยทัศน์ พันธกิจ และค่านิยมของสถานศึกษา", evidenceBase.basicManagement),
          makeIndicator("2.2", "นโยบาย ทิศทาง กลยุทธ์และแผนงานสอดคล้องกับวิสัยทัศน์และพันธกิจ", evidenceBase.basicManagement),
          makeIndicator("2.3", "ผู้บริหารสถานศึกษามีภาวะผู้นำทางวิชาการและบริหารจัดการด้วยหลักธรรมาภิบาล", evidenceBase.basicManagement),
          makeIndicator("2.4", "แผนงานและการดำเนินงานด้านการพัฒนาครูและบุคลากรทางการศึกษา", evidenceBase.basicManagement),
          makeIndicator("2.5", "กระบวนการนิเทศการปฏิบัติงานของครูและบุคลากรทางการศึกษาอย่างเป็นระบบ", evidenceBase.basicManagement),
          makeIndicator("2.6", "การใช้สื่อ อุปกรณ์ ระบบเทคโนโลยีเพื่อสนับสนุนการจัดการศึกษา", evidenceBase.basicManagement),
          makeIndicator("2.7", "การจัดสภาพแวดล้อม อาคารสถานที่ ปลอดภัยและถูกสุขลักษณะ", evidenceBase.basicManagement),
          makeIndicator("2.8", "สวัสดิการ สวัสดิภาพ แนวทางการป้องกันโรค อุบัติภัย ภัยพิบัติ", evidenceBase.basicManagement),
          makeIndicator("2.9", "ระบบและกระบวนการช่วยเหลือผู้เรียน", evidenceBase.basicManagement),
          makeIndicator("2.10", "การเสริมสร้างเครือข่ายผู้ปกครอง องค์กร และชุมชน เพื่อความร่วมมือในการสนับสนุนการจัดการเรียนรู้และพัฒนาผู้เรียน", evidenceBase.basicManagement),
        ],
      },
      {
        title: "มาตรฐานที่ 3 การพัฒนาคุณภาพการจัดการเรียนรู้",
        indicators: [
          makeIndicator("3.1", "การออกแบบหลักสูตรและแผนการจัดการเรียนรู้ที่เสริมสร้างสมรรถนะและคุณลักษณะที่พึงประสงค์", evidenceBase.basicTeaching),
          makeIndicator("3.2", "การจัดกิจกรรมการเรียนรู้ที่เสริมสร้างสมรรถนะและคุณลักษณะที่พึงประสงค์", evidenceBase.basicTeaching),
          makeIndicator("3.3", "ครูวัดและประเมินผลการเรียนรู้ของผู้เรียนอย่างเป็นระบบและต่อเนื่อง", evidenceBase.basicTeaching),
        ],
      },
    ],
  },
];

documentGroupsV2.forEach((group) => {
  const prefix = group.id === "early-docs" ? "early" : "basic";
  group.standards.forEach((standard, standardIndex) => {
    standard.indicators.forEach((indicator, indicatorIndex) => {
      indicator[3] = `/assets/indicator-${prefix}-${standardIndex + 1}-${indicatorIndex + 1}.png`;
    });
  });
});

const spotlightItemsV2 = {
  ...spotlightItems,
  newsletter: [
    {
      title: "จดหมายข่าวฉบับที่ 1",
      desc: "ภาพจำลองจดหมายข่าวอัตราส่วน A4 สามารถวางไฟล์จริงทับ newsletter-1.png ได้ภายหลัง",
      image: "/assets/newsletter-1.png",
      ratio: "a4",
    },
    {
      title: "จดหมายข่าวฉบับที่ 2",
      desc: "ภาพจำลองจดหมายข่าวอัตราส่วน A4 สามารถวางไฟล์จริงทับ newsletter-2.png ได้ภายหลัง",
      image: "/assets/newsletter-2.png",
      ratio: "a4",
    },
    {
      title: "จดหมายข่าวฉบับที่ 3",
      desc: "ภาพจำลองจดหมายข่าวอัตราส่วน A4 สามารถวางไฟล์จริงทับ newsletter-3.png ได้ภายหลัง",
      image: "/assets/newsletter-3.png",
      ratio: "a4",
    },
  ],
};

const staffMembers = [
  ["นางศิวาลัย แก้วเขียว", "ผู้อำนวยการโรงเรียนบ้านน้ำพร"],
  ["นางสาววันชื่น ทองอยู่", "ครู หัวหน้าฝ่ายวิชาการ"],
  ["นางพิศมัย โกมาร", "ครู หัวหน้าฝ่ายบุคคล"],
  ["นางสาวพรพรรณ จันทะสี", "ครู หัวหน้าฝ่ายงบประมาณ"],
  ["นางรัตนา อ่ำนาเพียง", "ครู หัวหน้าฝ่ายบริหารทั่วไป"],
  ["นางสุจิตรา ฝั้นสีดา", "ครู โรงเรียนบ้านน้ำพร"],
  ["นางสาวสุวรรณา พุทธมาตย์", "ครู โรงเรียนบ้านน้ำพร"],
  ["นางสาววิไลวรรณ ชาภูธร", "ครู โรงเรียนบ้านน้ำพร"],
  ["นายนิรุทธิ์ เสวะนา", "ครู โรงเรียนบ้านน้ำพร"],
  ["ว่าที่ร้อยตรีหญิงเอื้องคำ ชัยภา", "ครู โรงเรียนบ้านน้ำพร"],
  ["นางสาวสุภาพร พิมพุธ", "ครู โรงเรียนบ้านน้ำพร"],
  ["นายอิทธิภู กองพอด", "ครู โรงเรียนบ้านน้ำพร"],
  ["นางสาวยลดา จันดาหาร", "ครู โรงเรียนบ้านน้ำพร"],
  ["นางสาวรัตติกานต์ ราชศรีเมือง", "ครู โรงเรียนบ้านน้ำพร"],
  ["นางตำแหน่งว่าง รอบรรจุ", "ครู โรงเรียนบ้านน้ำพร"],
  ["นางสาวทิวาพร คำพรม", "เจ้าหน้าที่ธุรการ"],
  ["นายประสิทธิ์ ไพฑูรย์", "นักการภารโรง"],
].map(([name, role], index) => ({
  id: index + 1,
  name,
  role,
  image: `/assets/staff-${String(index + 1).padStart(2, "0")}.png`,
}));

function navigate(path) {
  const mappedPath = path === "/early-childhood" || path === "/basic-education" ? "/#documents" : path;
  if (mappedPath.startsWith("/#")) {
    window.history.pushState({}, "", mappedPath);
    const target = document.getElementById(mappedPath.slice(2));
    target?.scrollIntoView({ behavior: "smooth", block: "start" });
    window.dispatchEvent(new PopStateEvent("popstate"));
    return;
  }
  if (mappedPath.startsWith("#")) {
    window.history.pushState({}, "", `/${mappedPath}`);
    const target = document.getElementById(mappedPath.slice(1));
    target?.scrollIntoView({ behavior: "smooth", block: "start" });
    window.dispatchEvent(new PopStateEvent("popstate"));
    return;
  }
  window.history.pushState({}, "", path);
  window.dispatchEvent(new PopStateEvent("popstate"));
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function App() {
  const [path, setPath] = useState(window.location.pathname);
  const [announcementOpen, setAnnouncementOpen] = useState(() => !sessionStorage.getItem("announcementClosed"));

  useEffect(() => {
    const onPop = () => setPath(window.location.pathname);
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  useEffect(() => {
    document.body.classList.remove("high-contrast", "yellow-contrast");
  }, []);

  useEffect(() => {
    if (path.includes("early-childhood") || path.includes("basic-education")) {
      navigate("/#documents");
    }
  }, [path]);

  return (
    <>
      <Header />
      {(
        <Announcement open={announcementOpen} onClose={() => {
          sessionStorage.setItem("announcementClosed", "1");
          setAnnouncementOpen(false);
        }} />
      )}
      <HomePage />
      <Footer />
      <BackToTop />
    </>
  );
}

function Header() {
  const [query, setQuery] = useState("");
  const item = (href, label, icon) => (
    <a
      className="nav-item"
      href={href}
      onClick={(event) => {
        if (href.startsWith("/") || href.startsWith("#")) {
          event.preventDefault();
          navigate(href);
        }
      }}
    >
      <Icon name={icon} />
      <span>{label}</span>
    </a>
  );

  return (
    <>
      <header className="site-header" id="top">
        <div className="container header-inner">
          <a className="brand" href="/" onClick={(e) => { e.preventDefault(); navigate("/"); }}>
            <span className="brand-logos">
              <img src="/assets/np-logo.png" alt="โลโก้โรงเรียนบ้านน้ำพร" />
              <img src="/assets/onesqa-logo.png" alt="โลโก้ สมศ." />
            </span>
            <span className="brand-text">
              <strong>โรงเรียนบ้านน้ำพร</strong>
              <small>สำนักงานเขตพื้นที่การศึกษาประถมศึกษาเลย เขต 1</small>
            </span>
          </a>
        </div>
      </header>
      <nav className="main-nav" aria-label="เมนูหลัก">
        <div className="container nav-inner">
          <div className="menu-links" id="site-menu">
            {item("/#home", "หน้าแรก", "home")}
            {item("/#about", "ข้อมูลโรงเรียน", "school")}
            {item("/#staff", "ข้อมูลบุคลากร", "people")}
            {item("/#documents", "เอกสาร/หลักฐาน", "docs")}
            {item("/#news", "ประชาสัมพันธ์", "news")}
            {item("/#references", "วิดีโอ", "video")}
            {item("/#contact", "ติดต่อ", "contact")}
            <form className="nav-search-form" role="search" onSubmit={(event) => event.preventDefault()}>
              <label>
                <Icon name="search" />
                <input
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="ค้นหา"
                  aria-label="ค้นหาในเว็บไซต์"
                />
              </label>
            </form>
          </div>
        </div>
      </nav>
    </>
  );
}

function MegaOverlay({ open, close }) {
  const groups = [
    ["แนะนำ", ["ข้อมูลโรงเรียน", "วิสัยทัศน์/พันธกิจ", "ตราสัญลักษณ์", "โครงสร้างการบริหาร"]],
    ["การประเมินภายนอก", ["ปฐมวัย", "ขั้นพื้นฐาน", "เอกสารหลักฐาน", "ปฏิทินเตรียมประเมิน"]],
    ["สื่อสารองค์กร", ["ประชาสัมพันธ์", "ประกาศ", "ภาพกิจกรรม", "สมัครงาน"]],
    ["คลังความรู้", ["เกณฑ์การประเมิน", "แบบฟอร์ม", "คู่มือ", "มัลติมีเดีย"]],
    ["ติดต่อ", ["ข้อมูลการติดต่อ", "ผู้ดูแลเว็บไซต์", "แผนผังเว็บไซต์"]],
  ];
  return (
    <div className={`mega-overlay ${open ? "is-open" : ""}`} aria-hidden={!open}>
      <div className="mega-sheet">
        <button type="button" className="mega-close" onClick={close}>ปิดเมนู</button>
        {groups.map(([title, items]) => (
          <section key={title}>
            <h2>{title}</h2>
            {items.map((item) => <a href="#" key={item} onClick={close}>{item}</a>)}
          </section>
        ))}
      </div>
    </div>
  );
}

function SearchOverlay({ open, onClose }) {
  const [result, setResult] = useState("");
  return (
    <div className={`search-overlay ${open ? "is-open" : ""}`} aria-hidden={!open}>
      <div className="search-dialog" role="dialog" aria-modal="true" aria-label="ค้นหาในเว็บไซต์">
        <button className="close-search" type="button" onClick={onClose}>ปิด</button>
        <h2>ค้นหาในเว็บไซต์</h2>
        <form className="search-form" onSubmit={(event) => {
          event.preventDefault();
          const query = new FormData(event.currentTarget).get("q")?.trim();
          setResult(query ? `พบหัวข้อที่เกี่ยวข้องกับ "${query}" ในหน้าเว็บนี้ สามารถเลือกจากเมนูหรือไทม์ไลน์ด้านซ้าย` : "กรุณาพิมพ์คำค้น");
        }}>
          <input name="q" type="search" placeholder="พิมพ์คำค้น เช่น SAR, มาตรฐานที่ 1, ปฐมวัย" aria-label="คำค้น" />
          <button type="submit">ค้นหา</button>
        </form>
        <p className="search-result" aria-live="polite">{result}</p>
      </div>
    </div>
  );
}

function AccessDrawer({ open, setOpen, setFontScale, setContrast }) {
  return (
    <section className={`access-drawer ${open ? "is-open" : ""}`} aria-label="การเข้าถึง">
      <button className="access-handle" type="button" aria-expanded={open} onClick={() => setOpen(!open)}>การเข้าถึง</button>
      <div className="access-panel">
        <h2>การเข้าถึง</h2>
        <p>ขนาดตัวอักษร</p>
        <div className="access-row">
          <button type="button" onClick={() => setFontScale((v) => Math.max(0.9, v - 0.06))}>ก</button>
          <button type="button" onClick={() => setFontScale(1)}>ก</button>
          <button type="button" onClick={() => setFontScale((v) => Math.min(1.18, v + 0.06))}>ก</button>
        </div>
        <p>ความคมชัด</p>
        <div className="access-row">
          <button type="button" onClick={() => setContrast("normal")}>ปกติ</button>
          <button type="button" onClick={() => setContrast("mono")}>ขาวดำ</button>
          <button type="button" onClick={() => setContrast("yellow")}>เหลืองดำ</button>
        </div>
      </div>
    </section>
  );
}

function FloatingPanels({ setFontScale, setContrast }) {
  const [access, setAccess] = useState(false);
  const [quick, setQuick] = useState(false);
  return (
    <div className="floating-panels">
      <section className={`float-panel ${access ? "is-open" : ""}`}>
        <button type="button" onClick={() => setAccess(!access)}>การเข้าถึง</button>
        <div>
          <h2>การเข้าถึง</h2>
          <p>ขนาดตัวอักษร</p>
          <div className="access-row">
            <button type="button" onClick={() => setFontScale((v) => Math.max(0.9, v - 0.06))}>ก</button>
            <button type="button" onClick={() => setFontScale(1)}>ก</button>
            <button type="button" onClick={() => setFontScale((v) => Math.min(1.18, v + 0.06))}>ก</button>
          </div>
          <p>ความคมชัด</p>
          <div className="access-row">
            <button type="button" onClick={() => setContrast("normal")}>ปกติ</button>
            <button type="button" onClick={() => setContrast("mono")}>ขาวดำ</button>
            <button type="button" onClick={() => setContrast("yellow")}>เหลืองดำ</button>
          </div>
        </div>
      </section>
      <section className={`float-panel quick-float ${quick ? "is-open" : ""}`}>
        <button type="button" onClick={() => setQuick(!quick)}>เมนูด่วน</button>
        <div>
          <h2>เมนูด่วน</h2>
          <a href="mailto:numporn@loei1.go.th">อิเล็กทรอนิกส์เมล์</a>
          <a href="/early-childhood" onClick={(e) => { e.preventDefault(); navigate("/early-childhood"); }}>AQA ปฐมวัย</a>
          <a href="/basic-education" onClick={(e) => { e.preventDefault(); navigate("/basic-education"); }}>ค้นหาภายนอก</a>
          <a href="#news">แฟนเพจ</a>
          <a href="#references">วิดีทัศน์</a>
        </div>
      </section>
    </div>
  );
}

function Announcement({ open, onClose }) {
  if (!open) return null;
  return (
    <div className="announcement-modal is-open" role="dialog" aria-modal="true" aria-label="ประกาศสำคัญ">
      <div className="announcement-card">
        <button className="announcement-close" type="button" onClick={onClose}>ปิด</button>
        <img src="/assets/np-logo.png" alt="" />
        <h2>ยินดีต้อนรับสู่ระบบเตรียมรับการประเมิน สมศ. รอบที่ 5</h2>
        <p>เว็บไซต์นี้รวบรวมข้อมูล มาตรฐาน ตัวชี้วัด และเอกสารหลักฐานของโรงเรียนบ้านน้ำพร</p>
        <a href="#documents" onClick={(event) => { event.preventDefault(); onClose(); navigate("#documents"); }}>เข้าสู่ข้อมูลการประเมิน</a>
      </div>
    </div>
  );
}

function ScrollTimeline({ items }) {
  const [active, setActive] = useState(items[0]?.id);
  const activeItem = items.find((item) => item.id === active);
  const tone = activeItem?.tone === "dark" ? "is-on-dark" : "is-on-light";
  const progress = Math.max(0, items.findIndex((item) => item.id === active)) / Math.max(1, items.length - 1);

  useEffect(() => {
    const updateActive = () => {
      const bottomReached = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 8;
      if (bottomReached) {
        setActive(items[items.length - 1]?.id);
        return;
      }
      const marker = window.scrollY + Math.min(window.innerHeight * 0.42, 360);
      const sections = items
        .map((item) => ({ ...item, element: document.getElementById(item.id) }))
        .filter((item) => item.element)
        .map((item) => ({ ...item, top: item.element.getBoundingClientRect().top + window.scrollY }));
      const current = sections.reduce((latest, item) => item.top <= marker ? item : latest, sections[0]);
      if (current?.id) setActive(current.id);
    };
    updateActive();
    window.addEventListener("scroll", updateActive, { passive: true });
    window.addEventListener("resize", updateActive);
    return () => {
      window.removeEventListener("scroll", updateActive);
      window.removeEventListener("resize", updateActive);
    };
  }, [items]);

  return (
    <aside className={`scroll-timeline ${tone}`} style={{ "--timeline-progress": progress }} aria-label="ตำแหน่งของหน้าเว็บ">
      {items.map((item) => (
        <a
          key={item.id}
          className={active === item.id ? "is-active" : ""}
          href={`#${item.id}`}
          aria-current={active === item.id ? "location" : undefined}
          onClick={(event) => {
            event.preventDefault();
            setActive(item.id);
            navigate(`#${item.id}`);
          }}
        >
          <span>{item.label}</span>
        </a>
      ))}
    </aside>
  );
}

function ScrollReelTestimonials() {
  const [index, setIndex] = useState(0);
  const [pitch, setPitch] = useState(129);
  const middleRef = useRef(null);
  const current = reelItems[index];

  useEffect(() => {
    const measure = () => {
      const column = middleRef.current;
      const figure = column?.querySelector("figure");
      if (!column || !figure) return;
      const styles = window.getComputedStyle(column);
      const gap = Number.parseFloat(styles.rowGap || styles.gap) || 0;
      setPitch(figure.getBoundingClientRect().height + gap);
    };
    measure();
    const observer = new ResizeObserver(measure);
    if (middleRef.current) observer.observe(middleRef.current);
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const chars = (text) => Array.from(text).map((char, i) => (
    char === " " ? " " : <span className="char" style={{ animationDelay: `${i * 8}ms` }} key={`${text}-${i}`}>{char}</span>
  ));

  return (
    <div
      className="reel-board"
      role="region"
      aria-roledescription="carousel"
      aria-label="ข้อมูลเด่นการประเมิน"
      style={{ "--middle-y": `${-index * pitch}px`, "--side-y": `${index * pitch}px` }}
    >
      <div className="portrait-reel" aria-hidden="true">
        <div className="reel-column side-column">{Array.from({ length: 6 }).map((_, i) => <span key={i}></span>)}</div>
        <div className="reel-column middle-column" ref={middleRef}>
          <span></span>
          {reelItems.map((item, i) => (
            <React.Fragment key={item.author}>
              <figure><img src={item.image} alt="" /></figure>
              {i < reelItems.length - 1 && <><span></span><span></span></>}
            </React.Fragment>
          ))}
          <span></span>
        </div>
        <div className="reel-column side-column">{Array.from({ length: 6 }).map((_, i) => <span key={i}></span>)}</div>
      </div>
      <div className="reel-content">
        <div>
          <div className="quote-mark" aria-hidden="true">“</div>
          <p className="reel-quote" key={current.quote}>{chars(current.quote)}</p>
          <p className="reel-author" key={current.author}>{chars(current.author)}</p>
        </div>
        <div className="reel-controls">
          <button type="button" disabled={index === 0} onClick={() => setIndex((v) => Math.max(0, v - 1))} aria-label="ก่อนหน้า">‹</button>
          <button type="button" disabled={index === reelItems.length - 1} onClick={() => setIndex((v) => Math.min(reelItems.length - 1, v + 1))} aria-label="ถัดไป">›</button>
        </div>
      </div>
    </div>
  );
}

function ProfileTestimonialCarousel() {
  const [index, setIndex] = useState(0);
  const current = profileTestimonials[index];
  const next = () => setIndex((value) => (value + 1) % profileTestimonials.length);
  const previous = () => setIndex((value) => (value - 1 + profileTestimonials.length) % profileTestimonials.length);

  useEffect(() => {
    const timer = setInterval(next, 6500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="profile-hero" id="home" data-section>
      <div className="container profile-carousel">
        <div className="profile-image-card" key={current.image}>
          <img src={current.image} alt={current.name} />
        </div>
        <article className="profile-copy-card" key={current.name}>
          <span>ONESQA รอบที่ 5</span>
          <h1>{current.name}</h1>
          <p className="profile-title">{current.title}</p>
          <p>{current.description}</p>
          <div className="profile-actions">
            <a href="#documents" onClick={(event) => { event.preventDefault(); navigate("#documents"); }}>ดูเอกสารและหลักฐาน</a>
            <a href="#news" onClick={(event) => { event.preventDefault(); navigate("#news"); }}>ข่าวประชาสัมพันธ์</a>
          </div>
        </article>
        <div className="profile-controls" aria-label="ควบคุม carousel">
          <button type="button" onClick={previous} aria-label="ก่อนหน้า">‹</button>
          <div className="profile-dots">
            {profileTestimonials.map((item, dotIndex) => (
              <button
                type="button"
                key={item.name}
                className={dotIndex === index ? "is-active" : ""}
                aria-label={`ไปยังรายการที่ ${dotIndex + 1}`}
                onClick={() => setIndex(dotIndex)}
              />
            ))}
          </div>
          <button type="button" onClick={next} aria-label="ถัดไป">›</button>
        </div>
      </div>
    </section>
  );
}

function HomePage() {
  return (
    <>
      <ScrollTimeline items={[
        { id: "home", label: "หน้าแรก", tone: "dark" },
        { id: "about", label: "ข้อมูลโรงเรียน", tone: "light" },
        { id: "staff", label: "ข้อมูลบุคลากร", tone: "light" },
        { id: "documents", label: "เอกสาร/หลักฐาน", tone: "light" },
        { id: "news", label: "ประชาสัมพันธ์", tone: "light" },
        { id: "references", label: "วิดีโอ", tone: "light" },
        { id: "contact", label: "ติดต่อ", tone: "dark" },
      ]} />
      <main>
        <ProfileTestimonialCarousel />
        <QuickMenu />
        <About />
        <StaffAccordion />
        <Stakeholders />
        <AssessmentSelect />
        <News />
        <KnowledgeVideos />
        <Sitemap />
      </main>
    </>
  );
}

function OnesqaHero() {
  const slides = [
    ["ประเมินอย่างมีมาตรฐาน", "ลดภาระงานด้วยเทคโนโลยี", "ส่งเสริมการมีส่วนร่วมในทุกภาคส่วน"],
    ["ประเมินสร้างคุณค่า", "สู่การพัฒนาการศึกษาไทย", "โรงเรียนบ้านน้ำพรพร้อมรับการประเมินรอบที่ 5"],
    ["ประเมินคุณภาพการศึกษา", "เพื่อยกระดับการพัฒนาการศึกษาไทยอย่างมั่นคง", "เที่ยงตรง ได้มาตรฐาน คือหัวใจการประกันคุณภาพการศึกษา"],
  ];
  const [index, setIndex] = useState(0);
  const slide = slides[index];
  useEffect(() => {
    const timer = setInterval(() => setIndex((i) => (i + 1) % slides.length), 6500);
    return () => clearInterval(timer);
  }, []);
  return (
    <section className="onesqa-hero" id="home" data-section>
      <div className="hero-orbit" aria-hidden="true">
        <span>สมศ</span><span>QA</span><span>AQA</span><span>5</span>
      </div>
      <div className="container onesqa-hero-inner">
        <div className="hero-copy-block">
          <p>{slide[0]}</p>
          <h1>{slide[1]}</h1>
          <strong>{slide[2]}</strong>
        </div>
        <div className="hero-card-stack">
          <article><span>ผู้ประเมินภายนอก</span></article>
          <article><span>ความก้าวหน้าการประเมินคุณภาพภายนอก</span></article>
          <article><span>สถานศึกษา / สถาบันและต้นสังกัด</span></article>
          <article><span>หน่วยกำกับการประเมิน</span></article>
        </div>
        <div className="hero-pager">
          {slides.map((_, i) => (
            <button key={i} className={i === index ? "is-active" : ""} onClick={() => setIndex(i)}>{i + 1}</button>
          ))}
        </div>
      </div>
    </section>
  );
}

function QuickMenu() {
  return (
    <section className="quick-menu" aria-label="เมนูด่วน">
      <div className="container quick-grid">
        <a href="#documents" onClick={(e) => { e.preventDefault(); navigate("#documents"); }}><span><Icon name="target" />01</span><strong>ปฐมวัย</strong><small>3 มาตรฐาน 18 ตัวชี้วัด</small></a>
        <a href="#documents" onClick={(e) => { e.preventDefault(); navigate("#documents"); }}><span><Icon name="school" />02</span><strong>ขั้นพื้นฐาน</strong><small>3 มาตรฐาน 16 ตัวชี้วัด</small></a>
        <a href="#documents" onClick={(e) => { e.preventDefault(); navigate("#documents"); }}><span><Icon name="docs" />03</span><strong>เอกสารหลักฐาน</strong><small>SAR แผน หลักสูตร รายงาน</small></a>
        <a href="#staff"><span><Icon name="people" />04</span><strong>บุคลากร</strong><small>คณะผู้บริหาร ครู และบุคลากร</small></a>
        <a href="#references"><span><Icon name="video" />05</span><strong>วิดีโอ</strong><small>สื่อความรู้จาก YouTube</small></a>
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="section about-section" id="about" data-section>
      <div className="container split-layout">
        <div className="section-title left">
          <p><Icon name="school" /> ข้อมูลสถานศึกษา</p>
          <h2>โรงเรียนบ้านน้ำพร</h2>
          <span>สังกัดสำนักงานเขตพื้นที่การศึกษาประถมศึกษาเลย เขต 1</span>
        </div>
        <div className="info-board">
          <article><h3>เป้าหมายของเว็บไซต์</h3><p>รวบรวมข้อมูลพื้นฐาน เอกสารหลักฐาน และผลการดำเนินงานตามมาตรฐาน สมศ. รอบที่ 5 เพื่อให้คณะกรรมการ ครู บุคลากร และผู้เกี่ยวข้องเข้าถึงข้อมูลได้สะดวก</p></article>
          <article><h3>แนวทางการจัดหมวดเอกสาร</h3><p>จัดเอกสารตามระดับการศึกษา มาตรฐาน ตัวชี้วัด และปีการศึกษา เพื่อให้ตรวจสอบย้อนหลังและเชื่อมโยงหลักฐานได้ง่าย</p></article>
        </div>
      </div>
    </section>
  );
}

function Stakeholders() {
  return (
    <section className="section stakeholders-section" id="stakeholders">
      <div className="container">
        <div className="section-title"><p><Icon name="target" /> กลุ่มผู้ใช้งาน</p><h2>เข้าถึงข้อมูลตามบทบาท</h2></div>
        <div className="stakeholder-grid">
          <a href="#documents" onClick={(e) => { e.preventDefault(); navigate("#documents"); }}><strong>คณะผู้ประเมินภายนอก</strong><span>มาตรฐาน ตัวชี้วัด และหลักฐานประกอบ</span></a>
          <a href="#documents" onClick={(e) => { e.preventDefault(); navigate("#documents"); }}><strong>ครูและบุคลากร</strong><span>แฟ้มเอกสาร แผนงาน และรายงานผล</span></a>
          <a href="#news"><strong>ผู้ปกครองและชุมชน</strong><span>ข่าวประชาสัมพันธ์และกิจกรรมโรงเรียน</span></a>
          <a href="#staff"><strong>บุคลากร</strong><span>ข้อมูลคณะผู้บริหาร ครู และบุคลากรในรูปแบบ Spotlight Card</span></a>
        </div>
      </div>
    </section>
  );
}

function AssessmentSelect() {
  const [indicatorPreview, setIndicatorPreview] = useState(null);
  const [indicatorZoom, setIndicatorZoom] = useState(1);

  const openIndicatorPreview = (preview) => {
    setIndicatorPreview(preview);
    setIndicatorZoom(1);
  };

  return (
    <section className="section assessment-section document-evidence-section" id="documents" data-section>
      <div className="container">
        <div className="section-title document-title">
          <p><Icon name="docs" /> ศูนย์รวมเอกสารและหลักฐาน</p>
          <h2>เอกสารประกอบ/เอกสารหลักฐานการประกันคุณภาพภายนอก รอบที่ 5</h2>
          <span>รวมระดับปฐมวัยและระดับการศึกษาขั้นพื้นฐานไว้ในหน้าเดียว พร้อมหัวข้อย่อยเอกสารหลักฐานและปุ่มลิงก์ประกอบในแต่ละตัวชี้วัด</span>
        </div>
        <div className="document-hub-grid">
          {documentGroupsV2.map((group) => (
            <article className={`document-card ${group.accent === "gold" ? "early-card" : "basic-card"}`} key={group.id}>
              <div className="document-visual">
                <img src={group.image} alt={group.title} />
              </div>
              <div className="document-card-body">
                <span>{group.level}</span>
                <h3>{group.title}</h3>
                <p>คลิกหัวข้อมาตรฐานด้านล่างเพื่อเปิดรายละเอียดตัวชี้วัดและปุ่มเชื่อมโยงหลักฐานประกอบ</p>
              </div>
              <div className="document-actions">
                <a className="document-main-link" href={`#${group.id}`} onClick={(e) => { e.preventDefault(); navigate(`#${group.id}`); }}>
                  เปิดแฟ้ม {group.level}
                </a>
              </div>
            </article>
          ))}
        </div>
        <div className="evidence-accordion">
          {documentGroupsV2.map((group) => (
            <section className="evidence-level" id={group.id} key={group.id}>
              <div className="evidence-level-head">
                <img src={group.image} alt="" />
                <div>
                  <p>{group.level}</p>
                  <h3>{group.title}</h3>
                </div>
              </div>
              {group.standards.map((standard, standardIndex) => (
                <details className="evidence-standard" open key={standard.title}>
                  <summary>
                    <span>มาตรฐานที่ {standardIndex + 1}</span>
                    <strong>{standard.title}</strong>
                  </summary>
                  <div className="indicator-list">
                    {standard.indicators.map(([indicator, docs, code, image]) => (
                      <article className="indicator-card" key={`${code}-${indicator}`}>
                        <div className="indicator-content">
                          <div className="indicator-heading">
                            <span>ตัวชี้วัดที่ {code}</span>
                            <h4>{indicator}</h4>
                          </div>
                          <button
                            className="indicator-media"
                            type="button"
                            onClick={() => openIndicatorPreview({ image, title: `ตัวชี้วัดที่ ${code} ${indicator}` })}
                          >
                            <img src={image} alt={`ภาพประกอบตัวชี้วัดที่ ${code}`} />
                          </button>
                        </div>
                        <ul>
                          {docs.map((doc) => (
                            <li key={doc}>
                              <span>{doc}</span>
                              <a className="evidence-link" href="#documents" onClick={(e) => e.preventDefault()}>ลิงก์หลักฐาน</a>
                            </li>
                          ))}
                        </ul>
                      </article>
                    ))}
                  </div>
                </details>
              ))}
            </section>
          ))}
        </div>
      </div>
      {indicatorPreview && (
        <div className="indicator-preview-modal" role="dialog" aria-modal="true" aria-label={indicatorPreview.title} onClick={() => setIndicatorPreview(null)}>
          <div className="indicator-preview-panel" onClick={(event) => event.stopPropagation()}>
            <div className="indicator-preview-toolbar">
              <strong>{indicatorPreview.title}</strong>
              <div>
                <button type="button" onClick={() => setIndicatorZoom((zoom) => Math.max(0.75, zoom - 0.25))}>ซูมออก</button>
                <button type="button" onClick={() => setIndicatorZoom(1)}>100%</button>
                <button type="button" onClick={() => setIndicatorZoom((zoom) => Math.min(2.5, zoom + 0.25))}>ซูมเข้า</button>
                <button type="button" onClick={() => setIndicatorPreview(null)}>ปิด</button>
              </div>
            </div>
            <div className="indicator-preview-stage">
              <img
                src={indicatorPreview.image}
                alt={indicatorPreview.title}
                style={{ transform: `scale(${indicatorZoom})` }}
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function StaffAccordion() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((index) => (index + 1) % staffMembers.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="section staff-section staff-accordion-section" id="staff" data-section>
      <div className="container staff-accordion-layout">
        <div className="staff-accordion-list" aria-label="ข้อมูลบุคลากรโรงเรียนบ้านน้ำพร">
          {staffMembers.map((person, index) => (
            <button
              className={`staff-accordion-item ${index === activeIndex ? "is-active" : ""}`}
              type="button"
              key={person.id}
              onMouseEnter={() => setActiveIndex(index)}
              onFocus={() => setActiveIndex(index)}
              onClick={() => setActiveIndex(index)}
            >
              <img src={person.image} alt={person.name} />
              <span className="staff-accordion-overlay" aria-hidden="true" />
              <span className="staff-accordion-label">
                <strong>{person.name}</strong>
                <small>{person.role}</small>
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function StaffSpotlight() {
  const director = staffMembers[0];
  const staff = staffMembers.slice(1);
  const [active, setActive] = useState(0);
  const [selected, setSelected] = useState(null);
  const visibleStaff = staff.map((_, index) => staff[(active + index) % staff.length]);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((value) => (value + 1) % staff.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [staff.length]);

  return (
    <section className="section staff-section" id="staff" data-section>
      <div className="container">
        <div className="section-title">
          <p><Icon name="people" /> ข้อมูลบุคลากร</p>
          <h2>คณะผู้บริหาร ครู และบุคลากรโรงเรียนบ้านน้ำพร</h2>
          <span>พื้นที่แสดงภาพบุคลากรแบบ Spotlight Card โดยภาพที่ 1 เป็น ผอ. และภาพที่ 2-17 เลื่อนอัตโนมัติทุก 5 วินาที</span>
        </div>

        <div className="staff-spotlight-layout">
          <button className="staff-card director-card" type="button" onClick={() => setSelected(director)}>
            <span className="staff-image"><img src={director.image} alt={director.name} /></span>
            <span className="staff-copy">
              <em>ผู้อำนวยการ</em>
              <strong>{director.name}</strong>
              <small>{director.role}</small>
            </span>
          </button>

          <div className="staff-carousel" aria-label="รายชื่อบุคลากร">
            <div className="staff-track">
              {visibleStaff.map((person, index) => (
                <button
                  className={`staff-card ${index === 0 ? "is-highlight" : ""}`}
                  type="button"
                  key={`${person.id}-${active}`}
                  onClick={() => setSelected(person)}
                >
                  <span className="staff-image"><img src={person.image} alt={person.name} /></span>
                  <span className="staff-copy">
                    <em>{index === 0 ? "ไฮไลท์บุคลากร" : `ลำดับที่ ${person.id}`}</em>
                    <strong>{person.name}</strong>
                    <small>{person.role}</small>
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {selected && (
        <div className="spotlight-modal staff-modal" role="dialog" aria-modal="true" aria-label={selected.name} onClick={() => setSelected(null)}>
          <button type="button" className="spotlight-close" onClick={() => setSelected(null)}>ปิด</button>
          <figure onClick={(event) => event.stopPropagation()}>
            <img src={selected.image} alt={selected.name} />
            <figcaption>{selected.name} | {selected.role}</figcaption>
          </figure>
        </div>
      )}
    </section>
  );
}

function Evidence() {
  return (
    <section className="section evidence-section" id="evidence" data-section>
      <div className="container">
        <div className="section-title"><p>เอกสารหลักฐาน</p><h2>แฟ้มเอกสารสำหรับเชื่อมโยงหลักฐาน</h2><span>สามารถเปลี่ยนลิงก์ `#` เป็นลิงก์ Google Drive หรือไฟล์ PDF ของโรงเรียนได้ภายหลัง</span></div>
        <div className="evidence-grid">
          <article><h3>เอกสารภาพรวม</h3><a href="#">รายงานการประเมินตนเอง SAR</a><a href="#">แผนพัฒนาคุณภาพการศึกษา</a><a href="#">แผนปฏิบัติการประจำปี</a><a href="#">หลักสูตรสถานศึกษา</a></article>
          <article><h3>ระดับปฐมวัย</h3><a href="/early-childhood" onClick={(e) => { e.preventDefault(); navigate("/early-childhood"); }}>มาตรฐานที่ 1 ผลลัพธ์คุณภาพเด็ก</a><a href="/early-childhood" onClick={(e) => { e.preventDefault(); navigate("/early-childhood"); }}>มาตรฐานที่ 2 การบริหารจัดการ</a><a href="/early-childhood" onClick={(e) => { e.preventDefault(); navigate("/early-childhood"); }}>มาตรฐานที่ 3 การจัดประสบการณ์</a><a href="#">Best Practice ปฐมวัย</a></article>
          <article><h3>ระดับขั้นพื้นฐาน</h3><a href="/basic-education" onClick={(e) => { e.preventDefault(); navigate("/basic-education"); }}>มาตรฐานที่ 1 ผลลัพธ์การเรียนรู้</a><a href="/basic-education" onClick={(e) => { e.preventDefault(); navigate("/basic-education"); }}>มาตรฐานที่ 2 การบริหารจัดการ</a><a href="/basic-education" onClick={(e) => { e.preventDefault(); navigate("/basic-education"); }}>มาตรฐานที่ 3 การจัดการเรียนรู้</a><a href="#">Best Practice ขั้นพื้นฐาน</a></article>
        </div>
      </div>
    </section>
  );
}

function News() {
  const [tab, setTab] = useState("announce");
  const [spotlight, setSpotlight] = useState(null);
  const panels = {
    announce: [["ใหม่", "เตรียมความพร้อมรับการประเมินคุณภาพภายนอก รอบที่ 5", "จัดทำแฟ้มข้อมูลตามมาตรฐานและตัวชี้วัดของ สมศ."], ["ประกาศ", "กำหนดผู้รับผิดชอบเอกสารแต่ละมาตรฐาน", "แบ่งงานระดับปฐมวัยและระดับการศึกษาขั้นพื้นฐาน"]],
    public: [["ข่าว", "ประชุมคณะทำงานประกันคุณภาพภายนอก", "ทบทวนข้อมูลพื้นฐานและเอกสารหลักฐานของโรงเรียน"], ["ข่าว", "เผยแพร่เว็บไซต์กลางสำหรับคณะครู", "ใช้ติดตามสถานะเอกสารและแหล่งอ้างอิงร่วมกัน"]],
  };
  const labels = [["announce", "ประกาศ"], ["public", "ประชาสัมพันธ์"], ["activity", "ภาพกิจกรรม"], ["newsletter", "จดหมายข่าว"]];
  const spotlightList = tab === "newsletter" ? spotlightItemsV2.newsletter : tab === "activity" ? spotlightItemsV2.activity : [];
  return (
    <section className="section news-section" id="news" data-section>
      <div className="container">
        <div className="section-title"><p><Icon name="news" /> ประชาสัมพันธ์</p><h2>ข่าวสารและประกาศของโรงเรียน</h2></div>
        <div className="news-tabs" role="tablist" aria-label="หมวดข่าว">
          {labels.map(([id, label]) => <button key={id} className={`news-tab ${tab === id ? "is-active" : ""}`} type="button" onClick={() => setTab(id)}>{label}</button>)}
        </div>
        {spotlightList.length ? (
          <div className={`spotlight-grid ${tab === "newsletter" ? "newsletter-grid" : ""}`} role="tabpanel">
            {spotlightList.map((item) => (
              <button className={`spotlight-card ${item.ratio}`} type="button" key={item.title} onClick={() => setSpotlight(item)}>
                <span className="spotlight-image"><img src={item.image} alt={item.title} /></span>
                <span className="spotlight-copy"><strong>{item.title}</strong><em>{item.desc}</em></span>
              </button>
            ))}
          </div>
        ) : (
          <div className="news-panel is-active" role="tabpanel">
            {panels[tab].map(([kind, title, desc]) => <article key={title}><span>{kind}</span><h3>{title}</h3><p>{desc}</p><a href="#news">อ่านเพิ่มเติม</a></article>)}
          </div>
        )}
      </div>
      {spotlight && (
        <div className="spotlight-modal" role="dialog" aria-modal="true" aria-label={spotlight.title} onClick={() => setSpotlight(null)}>
          <button type="button" className="spotlight-close" onClick={() => setSpotlight(null)}>ปิด</button>
          <figure className={spotlight.ratio} onClick={(event) => event.stopPropagation()}>
            <img src={spotlight.image} alt={spotlight.title} />
            <figcaption>{spotlight.title}</figcaption>
          </figure>
        </div>
      )}
    </section>
  );
}

function PrepTimeline() {
  return (
    <section className="section timeline-section" id="timeline" data-section>
      <div className="container">
        <div className="section-title"><p>ปฏิทินเตรียมประเมิน</p><h2>ลำดับงานที่แนะนำ</h2></div>
        <div className="timeline">
          <article><span>1</span><strong>รวบรวมข้อมูลพื้นฐาน</strong><p>ตรวจสอบข้อมูลนักเรียน บุคลากร แผนงาน และผลการดำเนินงานย้อนหลัง</p></article>
          <article><span>2</span><strong>จัดเอกสารตามตัวชี้วัด</strong><p>แยกระดับปฐมวัยและขั้นพื้นฐาน พร้อมระบุผู้รับผิดชอบแต่ละมาตรฐาน</p></article>
          <article><span>3</span><strong>ตรวจความครบถ้วน</strong><p>ทวนหลักฐานเชิงประจักษ์ รายงานผล โครงการ ภาพกิจกรรม และ Best Practice</p></article>
          <article><span>4</span><strong>เผยแพร่และอัปเดต</strong><p>เชื่อมลิงก์ไฟล์จริงในเว็บไซต์และปรับสถานะเอกสารก่อนรับการประเมิน</p></article>
        </div>
      </div>
    </section>
  );
}

function KnowledgeVideos() {
  return (
    <section className="section video-knowledge-section" id="references" data-section>
      <div className="container">
        <div className="section-title">
          <p><Icon name="video" /> วิดีโอ</p>
          <h2>วิดีโอประกอบการเตรียมรับการประเมิน สมศ. รอบที่ 5</h2>
          <span>พื้นที่รวบรวมวิดีโอจาก YouTube สำหรับคณะครู บุคลากร และผู้เกี่ยวข้อง สามารถเปลี่ยนวิดีโอภายหลังได้</span>
        </div>
        <div className="video-knowledge-layout">
          <div className="video-frame">
            <iframe
              src="https://www.youtube.com/embed/_h6xvgOo8Hg"
              title="วิดีโอ สมศ. รอบที่ 5"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
          <aside className="video-info-panel">
            <span>ONESQA Video</span>
            <h3>วิดีโอสำหรับการเตรียมรับการประเมิน</h3>
            <p>ใช้วิดีโอนี้เป็นตัวอย่างก่อน เพื่อแสดงรูปแบบการฝัง YouTube ในหน้าเว็บ เมื่อมีลิงก์ใหม่สามารถเปลี่ยนเฉพาะรหัสวิดีโอได้ทันที</p>
            <a href="https://youtu.be/_h6xvgOo8Hg" target="_blank" rel="noopener">เปิดบน YouTube</a>
          </aside>
        </div>
      </div>
    </section>
  );
}

function References() {
  return (
    <section className="section reference-section" id="references" data-section>
      <div className="container reference-box">
        <div><p>แหล่งอ้างอิงข้อมูล</p><h2>สำนักงานรับรองมาตรฐานและประเมินคุณภาพการศึกษา (องค์การมหาชน)</h2></div>
        <div className="reference-links">
          <a href="https://www.onesqa.or.th/th/content-view/1168/3560/" target="_blank" rel="noopener">คู่มือกรอบแนวทางระดับการศึกษาขั้นพื้นฐาน</a>
          <a href="https://www.onesqa.or.th/upload/download/202312071159428.pdf" target="_blank" rel="noopener">ประกาศและตัวชี้วัด พ.ศ. 2567-2571</a>
          <a href="https://www.onesqa.or.th/th/index.php" target="_blank" rel="noopener">เว็บไซต์ สมศ.</a>
        </div>
      </div>
    </section>
  );
}

function Sitemap() {
  return (
    <section className="section sitemap-section" id="sitemap">
      <div className="container">
        <div className="section-title"><p>แผนผังเว็บไซต์</p><h2>โครงสร้างหน้าเว็บ</h2></div>
        <div className="sitemap-grid">
          <a href="#about">ข้อมูลโรงเรียน</a>
          <a href="#documents" onClick={(e) => { e.preventDefault(); navigate("#documents"); }}>เอกสาร/หลักฐาน</a>
          <a href="#early-docs" onClick={(e) => { e.preventDefault(); navigate("#early-docs"); }}>มาตรฐานปฐมวัย</a>
          <a href="#basic-docs" onClick={(e) => { e.preventDefault(); navigate("#basic-docs"); }}>มาตรฐานขั้นพื้นฐาน</a>
          <a href="#news">ประชาสัมพันธ์</a>
          <a href="#staff">ข้อมูลบุคลากร</a>
          <a href="#references">วิดีโอ</a>
        </div>
      </div>
    </section>
  );
}

function StandardsPage({ type }) {
  const isEarly = type === "early";
  const standards = isEarly ? earlyStandards : basicStandards;
  return (
    <>
      <ScrollTimeline items={[
        { id: "overview", label: "ภาพรวม" },
        { id: "standard-1", label: "มาตรฐาน 1" },
        { id: "standard-2", label: "มาตรฐาน 2" },
        { id: "standard-3", label: "มาตรฐาน 3" },
        { id: "contact", label: "ติดต่อ" },
      ]} />
      <main>
        <section className="page-hero" id="overview" data-section>
          <div className="container">
            <p>การประเมินคุณภาพภายนอก รอบที่ 5</p>
            <h1>{isEarly ? "ระดับการศึกษาปฐมวัย" : "ระดับการศึกษาขั้นพื้นฐาน"}</h1>
            <span>{isEarly ? "3 มาตรฐาน 18 ตัวชี้วัด" : "3 มาตรฐาน 16 ตัวชี้วัด"}</span>
          </div>
        </section>
        <section className="section standards-section">
          <div className="container">
            <div className="summary-strip">
              <strong>3 มาตรฐาน</strong>
              <strong>{isEarly ? "18 ตัวชี้วัด" : "16 ตัวชี้วัด"}</strong>
              <span>ใช้สำหรับเอกสารและผลการดำเนินงาน{isEarly ? "ระดับปฐมวัย" : "ระดับการศึกษาขั้นพื้นฐาน"}</span>
            </div>
            <div className="standard-list">
              {standards.map((standard, index) => (
                <details open id={standard.id} data-section key={standard.id}>
                  <summary><span>มาตรฐานที่ {index + 1}</span> {standard.title} <em>{standard.count}</em></summary>
                  <ol>{standard.items.map((item) => <li key={item}>{item}</li>)}</ol>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

function Footer() {
  return (
    <footer className="site-footer" id="contact" data-section>
      <div className="container compact-footer">
        <div className="compact-footer-logos">
          <img src="/assets/np-logo.png" alt="โลโก้โรงเรียนบ้านน้ำพร" />
          <img src="/assets/onesqa-logo.png" alt="โลโก้ สมศ." />
        </div>
        <div className="compact-footer-text">
          <strong>โรงเรียนบ้านน้ำพร</strong>
          <span>สำนักงานเขตพื้นที่การศึกษาประถมศึกษาเลย เขต 1</span>
          <span>ที่อยู่ 115 หมู่ 2 ต.ปากตม อ.เชียงคาน จ.เลย 42110 | ผู้อำนวยการโรงเรียนบ้านน้ำพร นางศิวาลัย แก้วเขียว</span>
          <span>E-mail: <a href="mailto:numporn@loei1.go.th">numporn@loei1.go.th</a> | โทรศัพท์ <a href="tel:0625461959">0625461959</a></span>
          <span>ผู้ดูแลเว็บไซต์ นายนิรุทธิ์ เสวะนา | โทรศัพท์ <a href="tel:081873581">081873581</a></span>
          <div className="footer-socials">
            <a href="https://www.facebook.com/NampornSchool" target="_blank" rel="noopener" aria-label="Facebook โรงเรียนบ้านน้ำพร">
              <span className="fb-icon" aria-hidden="true">f</span>
              Facebook
            </a>
            <a href="https://loei1.go.th/" target="_blank" rel="noopener" aria-label="Loei1">
              <img src="/assets/loei1-icon.svg" alt="" />
              Loei1
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function BackToTop() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return <button className={`back-to-top ${visible ? "is-visible" : ""}`} type="button" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>↑</button>;
}

createRoot(document.getElementById("root")).render(<App />);
