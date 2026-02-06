"use client";

import Link from "next/link";
import {
  FileText,
  MessageCircle,
  ClipboardList,
  BookOpen,
  Clock,
  Heart,
  ArrowRight,
  Shield,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/base";

const features = [
  {
    href: "/report",
    icon: FileText,
    title: "智能病历解读",
    description: "上传检查报告，AI 帮您翻译成通俗易懂的语言",
    color: "bg-blue-50 text-blue-600",
  },
  {
    href: "/symptoms",
    icon: MessageCircle,
    title: "症状智能分诊",
    description: "描述症状，AI 帮您分析可能的原因和推荐科室",
    color: "bg-green-50 text-green-600",
  },
  {
    href: "/preparation",
    icon: ClipboardList,
    title: "就医准备助手",
    description: "自动生成就医清单、症状描述和医生提问列表",
    color: "bg-purple-50 text-purple-600",
  },
  {
    href: "/knowledge",
    icon: BookOpen,
    title: "护理知识库",
    description: "个性化的饮食、用药、运动指南，知识卡片式展示",
    color: "bg-amber-50 text-amber-600",
  },
  {
    href: "/timeline",
    icon: Clock,
    title: "病情记录时间线",
    description: "记录症状变化、用药和检查结果，可视化时间轴",
    color: "bg-rose-50 text-rose-600",
  },
];

export default function HomePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-rose-100 mb-4">
          <Heart className="h-8 w-8 text-rose-500" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          家庭医疗助手
        </h1>
        <p className="text-lg text-gray-500 max-w-xl mx-auto">
          用 AI 将复杂的医疗信息翻译成家人能懂的语言，让照顾家人更安心
        </p>
      </div>

      {/* Feature Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-12">
        {features.map((feature) => (
          <Link key={feature.href} href={feature.href}>
            <Card className="h-full hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div
                  className={`inline-flex items-center justify-center w-10 h-10 rounded-lg ${feature.color} mb-3`}
                >
                  <feature.icon className="h-5 w-5" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-500">{feature.description}</p>
                <div className="flex items-center gap-1 mt-3 text-sm text-rose-600 font-medium">
                  开始使用 <ArrowRight className="h-4 w-4" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Disclaimer */}
      <Card className="bg-amber-50 border-amber-200">
        <CardContent className="flex gap-3">
          <Shield className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="font-medium text-amber-800 mb-1">重要声明</h4>
            <p className="text-sm text-amber-700 leading-relaxed">
              本工具提供的所有信息仅供参考，不能替代专业医疗诊断和治疗。
              如有疾病或不适，请及时前往正规医疗机构就诊。
              您的健康数据将被安全保护，不会分享给任何第三方。
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
