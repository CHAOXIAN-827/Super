import type { ReportAnalysis } from "@/types/report";
import type { TriageResult } from "@/types/symptom";
import type { PreparationChecklist } from "@/types/user";

const REPORT_ANALYSIS_PROMPT = `你是一位资深的医疗健康顾问，专门帮助家庭成员理解医疗检查报告。请分析以下检查报告内容，并以JSON格式返回分析结果。

要求：
1. elderlyExplanation: 用最简单的语言解释，使用生活化比喻，适合老年人理解（200字以内）
2. familyExplanation: 详细但通俗的解释，适合家属了解完整情况（500字以内）
3. medicalTerms: 报告中出现的医学术语及其通俗解释
4. abnormalIndicators: 异常指标列表，包含指标名、数值、正常范围、偏高/偏低/危急级别、解释
5. healthSuggestions: 基于报告结果的健康建议（3-5条）
6. summary: 一句话总结报告结果

⚠️ 重要声明：你提供的信息仅供参考，不能替代专业医疗诊断。请建议用户咨询专业医生。

请严格按照以下JSON格式返回，不要包含其他内容：
{
  "elderlyExplanation": "...",
  "familyExplanation": "...",
  "medicalTerms": [{"term": "...", "explanation": "..."}],
  "abnormalIndicators": [{"name": "...", "value": "...", "normalRange": "...", "level": "high|low|critical", "explanation": "..."}],
  "healthSuggestions": ["..."],
  "summary": "..."
}`;

const TRIAGE_SYSTEM_PROMPT = `你是一位经验丰富的医疗健康顾问，正在帮助用户初步了解他们或家人的症状。

你的角色是：
1. 耐心、友善地询问症状详情
2. 追问关键信息（持续时间、严重程度、伴随症状、既往病史等）
3. 提供可能的分析和建议
4. 推荐合适的就诊科室
5. 评估就医紧急程度

⚠️ 重要规则：
- 不要做出明确的诊断
- 使用"可能性分析"而非"诊断"
- 始终建议就医确认
- 如遇到疑似紧急情况，立即建议拨打急救电话

请用温和、专业的中文回复。每次回复尽量在200字以内，除非需要详细解释。`;

const TRIAGE_RESULT_PROMPT = `基于以上对话内容，请生成症状分诊结果。请严格按照以下JSON格式返回：
{
  "possibleConditions": [{"name": "...", "probability": "high|medium|low", "description": "..."}],
  "recommendedDepartment": "推荐就诊科室",
  "urgencyLevel": "emergency|urgent|routine|self-care",
  "additionalAdvice": "额外建议"
}`;

const PREPARATION_PROMPT = `你是一位贴心的就医准备助手。根据用户提供的症状和就诊科室信息，生成完整的就医准备清单。

请严格按照以下JSON格式返回：
{
  "items": [
    {"id": "1", "text": "携带物品描述", "checked": false, "category": "document|item|information"}
  ],
  "symptomDescription": "一段完整的症状描述文案，可以直接给医生看",
  "questionsForDoctor": ["需要问医生的问题1", "问题2", "..."],
  "department": "建议就诊科室"
}

分类说明：
- document: 证件和文件（身份证、医保卡、既往病历等）
- item: 需要携带的物品（水杯、零食、充电宝等）
- information: 需要准备的信息（症状记录、用药记录等）`;

export async function analyzeReport(ocrText: string): Promise<ReportAnalysis> {
  const response = await fetch("/api/claude", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      type: "report",
      content: ocrText,
      systemPrompt: REPORT_ANALYSIS_PROMPT,
    }),
  });

  if (!response.ok) {
    throw new Error("分析请求失败，请稍后重试");
  }

  const data = await response.json();
  return JSON.parse(data.result) as ReportAnalysis;
}

export async function sendTriageMessage(
  messages: { role: "user" | "assistant"; content: string }[]
): Promise<string> {
  const response = await fetch("/api/claude", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      type: "triage",
      messages,
      systemPrompt: TRIAGE_SYSTEM_PROMPT,
    }),
  });

  if (!response.ok) {
    throw new Error("请求失败，请稍后重试");
  }

  const data = await response.json();
  return data.result;
}

export async function generateTriageResult(
  messages: { role: "user" | "assistant"; content: string }[]
): Promise<TriageResult> {
  const response = await fetch("/api/claude", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      type: "triage-result",
      messages: [
        ...messages,
        { role: "user" as const, content: TRIAGE_RESULT_PROMPT },
      ],
      systemPrompt: TRIAGE_SYSTEM_PROMPT,
    }),
  });

  if (!response.ok) {
    throw new Error("生成结果失败");
  }

  const data = await response.json();
  return JSON.parse(data.result) as TriageResult;
}

export async function generatePreparation(
  symptoms: string,
  department: string
): Promise<PreparationChecklist> {
  const response = await fetch("/api/claude", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      type: "preparation",
      content: `症状：${symptoms}\n就诊科室：${department}`,
      systemPrompt: PREPARATION_PROMPT,
    }),
  });

  if (!response.ok) {
    throw new Error("生成清单失败");
  }

  const data = await response.json();
  return JSON.parse(data.result) as PreparationChecklist;
}
