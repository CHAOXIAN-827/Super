"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  MessageCircle,
  Send,
  RotateCcw,
  ClipboardCheck,
  AlertCircle,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  Button,
  Badge,
  Spinner,
} from "@/components/ui/base";
import { useAppStore } from "@/stores/app-store";
import { sendTriageMessage, generateTriageResult } from "@/lib/claude";
import type { ChatMessage, TriageResult } from "@/types/symptom";
import { getUrgencyLabel, getUrgencyColor } from "@/types/symptom";
import { cn } from "@/lib/utils";

export default function SymptomsPage() {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const {
    chatMessages,
    addChatMessage,
    clearChat,
    triageResult,
    setTriageResult,
  } = useAppStore();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  // Send initial greeting when chat is empty
  useEffect(() => {
    if (chatMessages.length === 0) {
      const greeting: ChatMessage = {
        id: "greeting",
        role: "assistant",
        content:
          "您好！我是您的健康咨询助手。请告诉我您或家人目前有哪些不舒服的症状？我会帮您做初步分析。\n\n请注意：我的分析仅供参考，不能替代专业医生的诊断。",
        timestamp: new Date().toISOString(),
      };
      addChatMessage(greeting);
    }
  }, []);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
      timestamp: new Date().toISOString(),
    };
    addChatMessage(userMessage);
    setInput("");
    setIsLoading(true);

    try {
      const allMessages = [...chatMessages, userMessage].map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const reply = await sendTriageMessage(allMessages);
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: reply,
        timestamp: new Date().toISOString(),
      };
      addChatMessage(assistantMessage);
    } catch {
      addChatMessage({
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "抱歉，服务暂时不可用，请稍后重试。",
        timestamp: new Date().toISOString(),
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateResult = async () => {
    setIsLoading(true);
    try {
      const allMessages = chatMessages.map((m) => ({
        role: m.role,
        content: m.content,
      }));
      const result = await generateTriageResult(allMessages);
      setTriageResult(result);
      setShowResult(true);
    } catch {
      alert("生成分析结果失败，请重试");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <MessageCircle className="h-6 w-6 text-green-500" />
            症状智能分诊
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            描述症状，AI 帮您分析可能的原因并推荐就诊科室
          </p>
        </div>
        <div className="flex gap-2">
          {chatMessages.length > 2 && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleGenerateResult}
              disabled={isLoading}
            >
              <ClipboardCheck className="h-4 w-4" />
              生成分析
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              clearChat();
              setShowResult(false);
            }}
          >
            <RotateCcw className="h-4 w-4" />
            重新开始
          </Button>
        </div>
      </div>

      {/* Triage Result */}
      {showResult && triageResult && (
        <TriageResultCard result={triageResult} onClose={() => setShowResult(false)} />
      )}

      {/* Chat Area */}
      <Card className="mb-4">
        <CardContent className="p-4">
          <div className="space-y-4 max-h-[500px] overflow-y-auto mb-4">
            {chatMessages.map((msg) => (
              <div
                key={msg.id}
                className={cn(
                  "flex",
                  msg.role === "user" ? "justify-end" : "justify-start"
                )}
              >
                <div
                  className={cn(
                    "max-w-[80%] rounded-xl px-4 py-3 text-sm",
                    msg.role === "user"
                      ? "bg-rose-600 text-white"
                      : "bg-gray-100 text-gray-700"
                  )}
                >
                  <p className="whitespace-pre-wrap">{msg.content}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-xl px-4 py-3">
                  <Spinner className="h-4 w-4" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="flex gap-2">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="请描述您或家人的症状..."
              className="flex-1 resize-none rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
              rows={2}
              disabled={isLoading}
            />
            <Button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className="self-end"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      <p className="text-xs text-gray-400 text-center">
        以上分析仅供参考，不能替代专业医疗诊断。如有不适请及时就医。
      </p>
    </div>
  );
}

function TriageResultCard({
  result,
  onClose,
}: {
  result: TriageResult;
  onClose: () => void;
}) {
  return (
    <Card className="mb-4 border-green-200 bg-green-50/50">
      <CardHeader>
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-gray-900 flex items-center gap-2">
            <ClipboardCheck className="h-5 w-5 text-green-600" />
            分诊分析结果
          </h3>
          <Button variant="ghost" size="sm" onClick={onClose}>
            收起
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Urgency */}
        <div
          className={cn(
            "p-3 rounded-lg border font-medium text-center",
            getUrgencyColor(result.urgencyLevel)
          )}
        >
          <AlertCircle className="h-5 w-5 inline mr-1" />
          紧急程度：{getUrgencyLabel(result.urgencyLevel)}
        </div>

        {/* Department */}
        <div>
          <p className="text-sm text-gray-500 mb-1">推荐就诊科室</p>
          <Badge variant="info">{result.recommendedDepartment}</Badge>
        </div>

        {/* Possible Conditions */}
        <div>
          <p className="text-sm text-gray-500 mb-2">可能性分析</p>
          <div className="space-y-2">
            {result.possibleConditions.map((cond, i) => (
              <div key={i} className="flex items-start gap-2 text-sm">
                <Badge
                  variant={
                    cond.probability === "high"
                      ? "danger"
                      : cond.probability === "medium"
                      ? "warning"
                      : "default"
                  }
                >
                  {cond.probability === "high"
                    ? "较高"
                    : cond.probability === "medium"
                    ? "中等"
                    : "较低"}
                </Badge>
                <div>
                  <span className="font-medium text-gray-900">{cond.name}</span>
                  <p className="text-gray-500">{cond.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Advice */}
        <div className="bg-white rounded-lg p-3 text-sm text-gray-700">
          {result.additionalAdvice}
        </div>
      </CardContent>
    </Card>
  );
}
