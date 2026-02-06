import type { ReportAnalysis } from "@/types/report";
import type { TriageResult } from "@/types/symptom";
import type { PreparationChecklist } from "@/types/user";

// Demo mock data - works without any backend/API
// When deploying with a backend, replace these with real API calls

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function analyzeReport(_ocrText: string): Promise<ReportAnalysis> {
  await delay(1500); // Simulate processing time
  return {
    elderlyExplanation:
      "您的检查结果整体还不错，就像汽车年检一样，大部分零件都正常运转。有几个小指标稍微偏高一点，就好比轮胎气压稍微多了一点点，不用太担心，注意饮食清淡、多喝水就好。",
    familyExplanation:
      "报告显示受检者的基本健康状况良好。血常规和生化指标中，大部分数值在正常范围内。需要关注的是：血压偏高（142/88mmHg）、总胆固醇和甘油三酯略有升高，低密度脂蛋白偏高。这些通常与饮食习惯和运动量有关。血糖、肝功能、肾功能指标均在正常范围。建议定期复查血压和血脂，调整饮食结构，增加运动量。总体来看无需过度担忧，但应保持健康的生活习惯。",
    medicalTerms: [
      { term: "血常规", explanation: "通过抽血检查血液中各种细胞的数量和质量，是最基本的体检项目" },
      { term: "总胆固醇(TC)", explanation: "血液中所有胆固醇的总量，过高容易导致动脉硬化" },
      { term: "甘油三酯(TG)", explanation: "血液中一种脂肪的含量，与饮食密切相关" },
      { term: "低密度脂蛋白(LDL-C)", explanation: "俗称'坏胆固醇'，过高会增加心血管疾病风险" },
      { term: "高密度脂蛋白(HDL-C)", explanation: "俗称'好胆固醇'，有保护血管的作用" },
      { term: "空腹血糖(GLU)", explanation: "空腹时血液中葡萄糖的浓度，反映血糖控制情况" },
      { term: "谷丙转氨酶(ALT)", explanation: "反映肝脏功能的重要指标" },
      { term: "肌酐(CR)", explanation: "反映肾脏过滤功能的指标" },
    ],
    abnormalIndicators: [
      {
        name: "总胆固醇(TC)",
        value: "5.8 mmol/L",
        normalRange: "3.1-5.2 mmol/L",
        level: "high",
        explanation: "总胆固醇略高于正常范围，建议减少高脂食物摄入，如油炸食品、动物内脏等",
      },
      {
        name: "甘油三酯(TG)",
        value: "1.9 mmol/L",
        normalRange: "0.56-1.70 mmol/L",
        level: "high",
        explanation: "甘油三酯轻度升高，与饮食中脂肪和碳水化合物摄入过多有关",
      },
      {
        name: "低密度脂蛋白(LDL-C)",
        value: "3.6 mmol/L",
        normalRange: "2.07-3.10 mmol/L",
        level: "high",
        explanation: "'坏胆固醇'偏高，增加动脉粥样硬化风险，需注意饮食控制",
      },
      {
        name: "收缩压",
        value: "142 mmHg",
        normalRange: "90-140 mmHg",
        level: "high",
        explanation: "收缩压略高于正常上限，属于1级高血压，建议减少盐分摄入、适当运动",
      },
    ],
    healthSuggestions: [
      "建议低盐低脂饮食，每日盐摄入量控制在6克以内，减少油炸食品和动物内脏",
      "每天保持30分钟中等强度运动，如快走、太极拳、游泳等",
      "建议3个月后复查血脂和血压，观察指标变化趋势",
      "保持充足睡眠（7-8小时），避免过度劳累和情绪激动",
      "如有头晕、胸闷、视物模糊等症状请及时就医",
    ],
    summary: "整体健康状况良好，血脂和血压略偏高，建议调整饮食和运动习惯并定期复查。",
  };
}

const triageResponses = [
  "了解了您描述的症状。请问这个症状是从什么时候开始的？持续多长时间了？是一直存在还是间歇性出现的？",
  "谢谢您的补充信息。请问除了这个主要症状外，还有没有其他伴随的不适？比如发热、恶心、食欲变化、睡眠影响等？",
  "好的，我基本了解了情况。再请问一下，之前有没有类似的情况发生过？目前有在服用什么药物吗？有没有高血压、糖尿病等慢性病？",
  "根据您描述的情况，我已经有了初步的分析。建议您点击上方的「生成分析」按钮，我会给您一份详细的分析报告，包括可能的原因和就诊建议。",
];

let triageIndex = 0;

export async function sendTriageMessage(
  _messages: { role: "user" | "assistant"; content: string }[]
): Promise<string> {
  await delay(1000);
  const response = triageResponses[Math.min(triageIndex, triageResponses.length - 1)];
  triageIndex++;
  return response;
}

export async function generateTriageResult(
  _messages: { role: "user" | "assistant"; content: string }[]
): Promise<TriageResult> {
  await delay(1500);
  triageIndex = 0;
  return {
    possibleConditions: [
      {
        name: "原发性高血压",
        probability: "high",
        description: "与年龄、饮食习惯、生活方式等因素相关的慢性血压升高",
      },
      {
        name: "颈椎病引起的头晕",
        probability: "medium",
        description: "颈椎退行性变压迫血管或神经，导致头晕、头痛等症状",
      },
      {
        name: "良性位置性眩晕",
        probability: "low",
        description: "内耳耳石脱落引起的短暂性眩晕，通常与体位变化有关",
      },
    ],
    recommendedDepartment: "心内科 / 神经内科",
    urgencyLevel: "routine",
    additionalAdvice:
      "建议近期安排就医，优先挂心内科。就诊前建议连续监测3天血压（早晚各一次）并记录。如出现剧烈头痛、视物模糊、胸闷、肢体麻木等症状，请立即就医。",
  };
}

export async function generatePreparation(
  symptoms: string,
  department: string
): Promise<PreparationChecklist> {
  await delay(1200);
  return {
    items: [
      { id: "1", text: "身份证原件", checked: false, category: "document" },
      { id: "2", text: "医保卡", checked: false, category: "document" },
      { id: "3", text: "既往病历和检查报告（如有）", checked: false, category: "document" },
      { id: "4", text: "近期血压记录表", checked: false, category: "document" },
      { id: "5", text: "目前正在服用的药物或药物清单", checked: false, category: "information" },
      { id: "6", text: "症状发作时间和频率记录", checked: false, category: "information" },
      { id: "7", text: "家族病史信息（高血压、糖尿病、心脏病等）", checked: false, category: "information" },
      { id: "8", text: "水杯（候诊可能较久）", checked: false, category: "item" },
      { id: "9", text: "少量零食（预防低血糖）", checked: false, category: "item" },
      { id: "10", text: "手机充电宝", checked: false, category: "item" },
      { id: "11", text: "口罩（医院防护）", checked: false, category: "item" },
      { id: "12", text: "纸巾", checked: false, category: "item" },
    ],
    symptomDescription: `患者，68岁女性。${symptoms || "近一周出现反复头晕症状，以起床时和体位变化时明显，持续约30分钟可自行缓解。伴有轻微耳鸣，无恶心呕吐、无视物旋转。"}既往有血压偏高病史，近期家庭自测血压约142/88mmHg。目前未规律服用降压药物。饮食偏咸，运动较少。希望明确头晕原因并进行血压管理。`,
    questionsForDoctor: [
      "头晕的具体原因是什么？需要做哪些检查来确诊？",
      "血压142/88mmHg需要开始药物治疗吗？还是可以先通过生活方式调整？",
      "如果需要服药，推荐什么药物？有什么副作用需要注意？",
      "日常饮食和运动有什么具体的建议？",
      "多久需要来复查一次？在家需要监测哪些指标？",
      "出现什么情况需要立即来急诊？",
    ],
    department: department || "心内科",
  };
}

export function getOcrDemoText(): string {
  return `体检报告

姓名：张XX    性别：女    年龄：68岁
体检日期：2024年1月15日
体检编号：TJ20240115-0892

一、一般检查
身高：158cm    体重：62kg    BMI：24.8
血压：142/88mmHg（偏高）
心率：76次/分

二、血常规
白细胞计数(WBC)：6.2×10⁹/L（正常范围：4.0-10.0）
红细胞计数(RBC)：4.1×10¹²/L（正常范围：3.5-5.0）
血红蛋白(HGB)：128g/L（正常范围：110-150）
血小板计数(PLT)：198×10⁹/L（正常范围：100-300）

三、血脂检查
总胆固醇(TC)：5.8mmol/L（正常范围：3.1-5.2）↑
甘油三酯(TG)：1.9mmol/L（正常范围：0.56-1.70）↑
高密度脂蛋白(HDL-C)：1.3mmol/L（正常范围：1.16-1.42）
低密度脂蛋白(LDL-C)：3.6mmol/L（正常范围：2.07-3.10）↑

四、血糖
空腹血糖(GLU)：5.6mmol/L（正常范围：3.9-6.1）

五、肝功能
谷丙转氨酶(ALT)：22U/L（正常范围：7-40）
谷草转氨酶(AST)：25U/L（正常范围：13-35）

六、肾功能
肌酐(CR)：68μmol/L（正常范围：41-81）
尿素氮(BUN)：5.2mmol/L（正常范围：2.6-7.5）

医生建议：
1. 血压偏高，建议心内科就诊
2. 血脂偏高，建议低脂饮食，适当运动
3. 定期复查血压、血脂`;
}
