"use client";

import React, { useState } from "react";
import {
  ClipboardList,
  Check,
  Copy,
  FileText,
  HelpCircle,
  Package,
  Info,
  Loader2,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  Button,
  Badge,
  Spinner,
} from "@/components/ui/base";
import { generatePreparation } from "@/lib/claude";
import type { PreparationChecklist, ChecklistItem } from "@/types/user";
import { cn } from "@/lib/utils";

const categoryConfig = {
  document: { icon: FileText, label: "证件文件", color: "text-blue-600" },
  item: { icon: Package, label: "随身物品", color: "text-purple-600" },
  information: { icon: Info, label: "信息准备", color: "text-green-600" },
};

export default function PreparationPage() {
  const [symptoms, setSymptoms] = useState("");
  const [department, setDepartment] = useState("");
  const [checklist, setChecklist] = useState<PreparationChecklist | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!symptoms.trim()) return;
    setIsLoading(true);
    try {
      const result = await generatePreparation(
        symptoms,
        department || "待确定"
      );
      setChecklist(result);
    } catch {
      alert("生成失败，请重试");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleItem = (id: string) => {
    if (!checklist) return;
    setChecklist({
      ...checklist,
      items: checklist.items.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      ),
    });
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  };

  const groupedItems = checklist
    ? {
        document: checklist.items.filter((i) => i.category === "document"),
        item: checklist.items.filter((i) => i.category === "item"),
        information: checklist.items.filter((i) => i.category === "information"),
      }
    : null;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <ClipboardList className="h-6 w-6 text-purple-500" />
          就医准备助手
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          输入症状信息，自动生成就医清单、症状描述和医生提问
        </p>
      </div>

      {/* Input Form */}
      {!checklist && (
        <Card className="mb-4">
          <CardContent className="space-y-4 py-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                症状描述 *
              </label>
              <textarea
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                placeholder="请描述主要症状，例如：最近一周经常头晕，尤其是起床的时候，还伴有轻微的耳鸣..."
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                rows={4}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                计划就诊科室（可选）
              </label>
              <input
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                placeholder="例如：神经内科、心内科..."
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <Button
              onClick={handleGenerate}
              disabled={!symptoms.trim() || isLoading}
              size="lg"
              className="w-full"
            >
              {isLoading ? (
                <>
                  <Spinner className="h-4 w-4" /> 正在生成...
                </>
              ) : (
                "生成就医准备清单"
              )}
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Results */}
      {checklist && (
        <div className="space-y-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setChecklist(null)}
          >
            重新生成
          </Button>

          {/* Checklist */}
          <Card>
            <CardHeader>
              <h3 className="font-semibold text-gray-900">携带物品清单</h3>
            </CardHeader>
            <CardContent className="space-y-4">
              {groupedItems &&
                (
                  Object.entries(groupedItems) as [
                    keyof typeof categoryConfig,
                    ChecklistItem[]
                  ][]
                ).map(([category, items]) => {
                  if (items.length === 0) return null;
                  const config = categoryConfig[category];
                  return (
                    <div key={category}>
                      <div className="flex items-center gap-2 mb-2">
                        <config.icon
                          className={cn("h-4 w-4", config.color)}
                        />
                        <span className="text-sm font-medium text-gray-700">
                          {config.label}
                        </span>
                      </div>
                      <div className="space-y-1.5 ml-6">
                        {items.map((item) => (
                          <label
                            key={item.id}
                            className="flex items-center gap-2 cursor-pointer"
                          >
                            <input
                              type="checkbox"
                              checked={item.checked}
                              onChange={() => toggleItem(item.id)}
                              className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                            />
                            <span
                              className={cn(
                                "text-sm",
                                item.checked
                                  ? "line-through text-gray-400"
                                  : "text-gray-700"
                              )}
                            >
                              {item.text}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                  );
                })}
            </CardContent>
          </Card>

          {/* Symptom Description */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-900">
                  症状描述文案（可直接给医生看）
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    copyToClipboard(checklist.symptomDescription, "symptom")
                  }
                >
                  {copied === "symptom" ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                  {copied === "symptom" ? "已复制" : "复制"}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-700 leading-relaxed bg-gray-50 rounded-lg p-3">
                {checklist.symptomDescription}
              </p>
            </CardContent>
          </Card>

          {/* Questions for Doctor */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                  <HelpCircle className="h-5 w-5 text-amber-500" />
                  需要问医生的问题
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    copyToClipboard(
                      checklist.questionsForDoctor.join("\n"),
                      "questions"
                    )
                  }
                >
                  {copied === "questions" ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                  {copied === "questions" ? "已复制" : "复制"}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <ol className="space-y-2">
                {checklist.questionsForDoctor.map((q, i) => (
                  <li key={i} className="flex gap-2 text-sm text-gray-700">
                    <Badge variant="default">{i + 1}</Badge>
                    {q}
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>

          {checklist.department && (
            <Card className="bg-purple-50 border-purple-200">
              <CardContent className="py-3 text-sm text-purple-700 text-center">
                建议就诊科室：
                <strong>{checklist.department}</strong>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}
