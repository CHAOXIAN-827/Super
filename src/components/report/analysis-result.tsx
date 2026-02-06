"use client";

import React, { useState } from "react";
import {
  AlertTriangle,
  User,
  Users,
  Stethoscope,
  Lightbulb,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import type { ReportAnalysis } from "@/types/report";
import { Card, CardContent, CardHeader, Badge, Button } from "@/components/ui/base";
import { cn } from "@/lib/utils";

interface AnalysisResultProps {
  analysis: ReportAnalysis;
}

type ExplanationTab = "elderly" | "family" | "medical";

const tabs: { key: ExplanationTab; label: string; icon: React.ElementType }[] = [
  { key: "elderly", label: "老人版", icon: User },
  { key: "family", label: "家属版", icon: Users },
  { key: "medical", label: "术语对照", icon: Stethoscope },
];

export function AnalysisResult({ analysis }: AnalysisResultProps) {
  const [activeTab, setActiveTab] = useState<ExplanationTab>("family");
  const [showAllSuggestions, setShowAllSuggestions] = useState(false);

  return (
    <div className="space-y-4">
      {/* Summary */}
      <Card>
        <CardContent className="py-4">
          <p className="text-gray-700 font-medium">{analysis.summary}</p>
        </CardContent>
      </Card>

      {/* Three-layer Explanation */}
      <Card>
        <CardHeader className="pb-0 border-b-0">
          <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium flex-1 justify-center transition-colors",
                  activeTab === tab.key
                    ? "bg-white text-rose-700 shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                )}
              >
                <tab.icon className="h-4 w-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </CardHeader>
        <CardContent>
          {activeTab === "elderly" && (
            <div className="bg-rose-50 rounded-lg p-4">
              <p className="text-gray-700 leading-relaxed text-lg">
                {analysis.elderlyExplanation}
              </p>
            </div>
          )}
          {activeTab === "family" && (
            <div className="bg-blue-50 rounded-lg p-4">
              <p className="text-gray-700 leading-relaxed">
                {analysis.familyExplanation}
              </p>
            </div>
          )}
          {activeTab === "medical" && (
            <div className="space-y-2">
              {analysis.medicalTerms.map((term, i) => (
                <div key={i} className="flex gap-3 p-3 bg-gray-50 rounded-lg">
                  <Badge variant="info">{term.term}</Badge>
                  <span className="text-sm text-gray-600">{term.explanation}</span>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Abnormal Indicators */}
      {analysis.abnormalIndicators.length > 0 && (
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
              <h3 className="font-semibold text-gray-900">异常指标</h3>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {analysis.abnormalIndicators.map((indicator, i) => (
              <div
                key={i}
                className={cn(
                  "p-3 rounded-lg border",
                  indicator.level === "critical"
                    ? "bg-red-50 border-red-200"
                    : indicator.level === "high"
                    ? "bg-amber-50 border-amber-200"
                    : "bg-blue-50 border-blue-200"
                )}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-gray-900">
                    {indicator.name}
                  </span>
                  <Badge
                    variant={
                      indicator.level === "critical"
                        ? "danger"
                        : indicator.level === "high"
                        ? "warning"
                        : "info"
                    }
                  >
                    {indicator.level === "critical"
                      ? "危急"
                      : indicator.level === "high"
                      ? "偏高"
                      : "偏低"}
                  </Badge>
                </div>
                <div className="text-sm text-gray-600 mb-1">
                  检测值: <strong>{indicator.value}</strong> | 正常范围:{" "}
                  {indicator.normalRange}
                </div>
                <p className="text-sm text-gray-500">{indicator.explanation}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Health Suggestions */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-green-500" />
            <h3 className="font-semibold text-gray-900">健康建议</h3>
          </div>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {analysis.healthSuggestions
              .slice(0, showAllSuggestions ? undefined : 3)
              .map((suggestion, i) => (
                <li key={i} className="flex gap-2 text-sm text-gray-700">
                  <span className="text-green-500 mt-0.5">&#10003;</span>
                  {suggestion}
                </li>
              ))}
          </ul>
          {analysis.healthSuggestions.length > 3 && (
            <Button
              variant="ghost"
              size="sm"
              className="mt-2"
              onClick={() => setShowAllSuggestions(!showAllSuggestions)}
            >
              {showAllSuggestions ? (
                <>
                  收起 <ChevronUp className="h-4 w-4" />
                </>
              ) : (
                <>
                  查看全部 <ChevronDown className="h-4 w-4" />
                </>
              )}
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
