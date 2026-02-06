import { create } from "zustand";
import type { MedicalReport } from "@/types/report";
import type { ChatMessage, TriageResult } from "@/types/symptom";
import type { TimelineEntry, KnowledgeCard } from "@/types/user";

interface AppState {
  // Reports
  reports: MedicalReport[];
  addReport: (report: MedicalReport) => void;
  updateReport: (id: string, updates: Partial<MedicalReport>) => void;

  // Chat / Triage
  chatMessages: ChatMessage[];
  addChatMessage: (message: ChatMessage) => void;
  clearChat: () => void;
  triageResult: TriageResult | null;
  setTriageResult: (result: TriageResult | null) => void;

  // Timeline
  timelineEntries: TimelineEntry[];
  addTimelineEntry: (entry: TimelineEntry) => void;
  removeTimelineEntry: (id: string) => void;

  // Knowledge
  knowledgeCards: KnowledgeCard[];
  toggleSaveCard: (id: string) => void;
}

export const useAppStore = create<AppState>((set) => ({
  // Reports
  reports: [],
  addReport: (report) =>
    set((state) => ({ reports: [report, ...state.reports] })),
  updateReport: (id, updates) =>
    set((state) => ({
      reports: state.reports.map((r) =>
        r.id === id ? { ...r, ...updates } : r
      ),
    })),

  // Chat
  chatMessages: [],
  addChatMessage: (message) =>
    set((state) => ({ chatMessages: [...state.chatMessages, message] })),
  clearChat: () => set({ chatMessages: [], triageResult: null }),
  triageResult: null,
  setTriageResult: (result) => set({ triageResult: result }),

  // Timeline
  timelineEntries: [
    {
      id: "demo-1",
      date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      type: "symptom",
      title: "出现头晕症状",
      description: "下午起床后感到头晕，持续约30分钟后缓解",
      tags: ["头晕", "血压"],
    },
    {
      id: "demo-2",
      date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      type: "checkup",
      title: "血压检测",
      description: "上午测量血压 145/92mmHg，略偏高",
      tags: ["血压", "检查"],
    },
    {
      id: "demo-3",
      date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      type: "medication",
      title: "开始服用降压药",
      description: "遵医嘱开始服用氨氯地平 5mg，每日一次",
      tags: ["降压药", "用药"],
    },
    {
      id: "demo-4",
      date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      type: "note",
      title: "饮食调整",
      description: "减少盐分摄入，增加蔬果比例，记录每日饮食",
      tags: ["饮食", "护理"],
    },
  ],
  addTimelineEntry: (entry) =>
    set((state) => ({
      timelineEntries: [entry, ...state.timelineEntries],
    })),
  removeTimelineEntry: (id) =>
    set((state) => ({
      timelineEntries: state.timelineEntries.filter((e) => e.id !== id),
    })),

  // Knowledge
  knowledgeCards: [
    {
      id: "k1",
      category: "diet",
      title: "高血压患者饮食指南",
      content:
        "控制钠盐摄入（每日<6g）；多吃新鲜蔬果、全谷物；减少饱和脂肪和反式脂肪；限制酒精摄入；推荐DASH饮食模式。每餐注意荤素搭配，少油少盐烹饪。",
      tags: ["高血压", "饮食"],
      saved: false,
    },
    {
      id: "k2",
      category: "medication",
      title: "常见降压药服用须知",
      content:
        "定时定量服药，不要随意停药或减量；注意监测血压变化；服药期间避免食用西柚；如出现头晕、乏力等不适及时就医；定期复查肝肾功能。",
      tags: ["降压药", "用药"],
      saved: false,
    },
    {
      id: "k3",
      category: "exercise",
      title: "老年人安全运动建议",
      content:
        "推荐每日30分钟中等强度运动如快走、太极拳；运动前做好热身；避免在过冷过热的环境中运动；运动后缓慢降速；如感到胸闷、气短应立即停止。",
      tags: ["运动", "安全"],
      saved: false,
    },
    {
      id: "k4",
      category: "care",
      title: "居家血压监测指南",
      content:
        "每天固定时间测量（推荐晨起和睡前）；测量前休息5分钟；保持坐姿，手臂与心脏同高；连续测量2次取平均值；做好记录便于就医时参考。",
      tags: ["血压", "监测", "居家"],
      saved: true,
    },
    {
      id: "k5",
      category: "diet",
      title: "糖尿病饮食管理",
      content:
        "控制总热量摄入；主食选择低GI食物（糙米、燕麦）；增加膳食纤维摄入；定时定量进餐；少食多餐；避免高糖饮料和甜食；注意食物的升糖指数。",
      tags: ["糖尿病", "饮食"],
      saved: false,
    },
    {
      id: "k6",
      category: "care",
      title: "老年人跌倒预防",
      content:
        "保持室内照明充足；清除地面障碍物；卫生间安装扶手和防滑垫；穿合脚防滑的鞋子；起床动作要慢（醒后躺30秒、坐30秒、站30秒）；定期检查视力。",
      tags: ["跌倒", "安全", "居家"],
      saved: false,
    },
  ],
  toggleSaveCard: (id) =>
    set((state) => ({
      knowledgeCards: state.knowledgeCards.map((c) =>
        c.id === id ? { ...c, saved: !c.saved } : c
      ),
    })),
}));
