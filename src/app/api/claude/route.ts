import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || "",
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, content, messages, systemPrompt } = body;

    if (!process.env.ANTHROPIC_API_KEY) {
      // Return mock data for demo mode when no API key is configured
      return NextResponse.json({
        result: getMockResponse(type, content),
      });
    }

    let result: string;

    if (type === "triage" || type === "triage-result") {
      const response = await anthropic.messages.create({
        model: "claude-sonnet-4-20250514",
        max_tokens: 2048,
        system: systemPrompt,
        messages: messages.map(
          (m: { role: "user" | "assistant"; content: string }) => ({
            role: m.role,
            content: m.content,
          })
        ),
      });
      const block = response.content[0];
      result = block.type === "text" ? block.text : "";
    } else {
      const response = await anthropic.messages.create({
        model: "claude-sonnet-4-20250514",
        max_tokens: 4096,
        system: systemPrompt,
        messages: [{ role: "user", content: content }],
      });
      const block = response.content[0];
      result = block.type === "text" ? block.text : "";
    }

    return NextResponse.json({ result });
  } catch (error) {
    console.error("Claude API error:", error);
    return NextResponse.json(
      { error: "AI 服务暂时不可用，请稍后重试" },
      { status: 500 }
    );
  }
}

function getMockResponse(type: string, content?: string): string {
  if (type === "report") {
    return JSON.stringify({
      elderlyExplanation:
        "您的检查结果整体还不错，就像汽车年检一样，大部分零件都正常运转。有几个小指标稍微偏高一点，就好比轮胎气压稍微多了一点点，不用太担心，注意饮食清淡、多喝水就好。",
      familyExplanation:
        "报告显示受检者的基本健康状况良好。血常规和生化指标中，大部分数值在正常范围内。需要关注的是：血压偏高、血脂略有异常，这些通常与饮食习惯和运动量有关。建议定期复查并调整生活方式。总体来看无需过度担忧，但应保持健康的生活习惯。",
      medicalTerms: [
        { term: "血常规", explanation: "通过抽血检查血液中各种细胞的数量和质量，是最基本的体检项目" },
        { term: "血脂", explanation: "血液中脂肪类物质的含量，过高容易导致血管硬化" },
        { term: "血压", explanation: "心脏泵血时对血管壁产生的压力，正常值为120/80mmHg左右" },
      ],
      abnormalIndicators: [
        {
          name: "总胆固醇",
          value: "5.8 mmol/L",
          normalRange: "3.1-5.2 mmol/L",
          level: "high",
          explanation: "总胆固醇略高于正常范围，建议减少高脂食物摄入",
        },
        {
          name: "收缩压",
          value: "142 mmHg",
          normalRange: "90-140 mmHg",
          level: "high",
          explanation: "收缩压略高，建议减少盐分摄入，适当运动",
        },
      ],
      healthSuggestions: [
        "建议低盐低脂饮食，每日盐摄入量控制在6克以内",
        "每天保持30分钟中等强度运动，如快走、太极拳",
        "建议3个月后复查血脂和血压",
        "保持充足睡眠，避免过度劳累",
        "如有头晕、胸闷等症状请及时就医",
      ],
      summary: "整体健康状况良好，血脂和血压略偏高，建议调整生活方式并定期复查。",
    });
  }

  if (type === "triage" || type === "triage-result") {
    if (type === "triage-result") {
      return JSON.stringify({
        possibleConditions: [
          {
            name: "普通感冒",
            probability: "high",
            description: "上呼吸道病毒感染，通常1-2周自愈",
          },
          {
            name: "流行性感冒",
            probability: "medium",
            description: "流感病毒感染，症状较重，需注意并发症",
          },
        ],
        recommendedDepartment: "内科/呼吸科",
        urgencyLevel: "routine",
        additionalAdvice:
          "多休息、多饮水，注意体温变化。如体温持续超过38.5°C或出现呼吸困难，请及时就医。",
      });
    }
    return "您好！我了解到您或家人身体不适，请不要着急。为了更好地帮助您，请详细描述一下症状：\n\n1. 主要不舒服的感觉是什么？\n2. 从什么时候开始的？\n3. 有没有其他伴随的不舒服？\n\n请放心，我会耐心帮您分析。";
  }

  if (type === "preparation") {
    return JSON.stringify({
      items: [
        { id: "1", text: "身份证", checked: false, category: "document" },
        { id: "2", text: "医保卡", checked: false, category: "document" },
        { id: "3", text: "既往病历和检查报告", checked: false, category: "document" },
        { id: "4", text: "目前正在服用的药物清单", checked: false, category: "information" },
        { id: "5", text: "近期的检查结果", checked: false, category: "document" },
        { id: "6", text: "水杯和少量零食", checked: false, category: "item" },
        { id: "7", text: "手机充电宝", checked: false, category: "item" },
        { id: "8", text: "纸巾和口罩", checked: false, category: "item" },
      ],
      symptomDescription: content || "患者近期出现不适症状，需要就医检查",
      questionsForDoctor: [
        "这个症状可能是什么原因引起的？",
        "需要做哪些检查？",
        "治疗方案是什么？大概需要多长时间？",
        "日常生活中有什么需要注意的？",
        "什么情况下需要立即来复诊？",
      ],
      department: "内科",
    });
  }

  return "{}";
}
