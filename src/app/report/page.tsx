"use client";

import React, { useState } from "react";
import { FileText, Loader2, History, ArrowLeft } from "lucide-react";
import { UploadZone } from "@/components/report/upload-zone";
import { AnalysisResult } from "@/components/report/analysis-result";
import { Card, CardContent, Button, Spinner, EmptyState } from "@/components/ui/base";
import { useAppStore } from "@/stores/app-store";
import { analyzeReport } from "@/lib/claude";
import { formatDateTime } from "@/lib/utils";
import type { MedicalReport } from "@/types/report";

type PageView = "upload" | "analyzing" | "result" | "history";

export default function ReportPage() {
  const [view, setView] = useState<PageView>("upload");
  const [currentReport, setCurrentReport] = useState<MedicalReport | null>(null);
  const [ocrText, setOcrText] = useState("");
  const [error, setError] = useState("");
  const { reports, addReport, updateReport } = useAppStore();

  const handleFileUpload = async (file: File) => {
    setError("");
    setView("analyzing");

    try {
      // Step 1: OCR
      const formData = new FormData();
      formData.append("file", file);
      const ocrResponse = await fetch("/api/ocr", {
        method: "POST",
        body: formData,
      });

      if (!ocrResponse.ok) throw new Error("图片识别失败");

      const ocrData = await ocrResponse.json();
      setOcrText(ocrData.text);

      // Create report entry
      const report: MedicalReport = {
        id: Date.now().toString(),
        title: file.name.replace(/\.[^/.]+$/, "") || "检查报告",
        ocrText: ocrData.text,
        analysis: null,
        createdAt: new Date().toISOString(),
      };
      addReport(report);
      setCurrentReport(report);

      // Step 2: AI Analysis
      const analysis = await analyzeReport(ocrData.text);
      updateReport(report.id, { analysis });
      setCurrentReport({ ...report, analysis });
      setView("result");
    } catch (err) {
      setError(err instanceof Error ? err.message : "处理失败，请重试");
      setView("upload");
    }
  };

  const viewHistoryReport = (report: MedicalReport) => {
    setCurrentReport(report);
    setView("result");
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          {view !== "upload" && (
            <Button variant="ghost" size="sm" onClick={() => setView("upload")}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
          )}
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <FileText className="h-6 w-6 text-blue-500" />
              智能病历解读
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              上传检查报告，AI 帮您翻译成通俗易懂的语言
            </p>
          </div>
        </div>
        {view !== "history" && reports.length > 0 && (
          <Button variant="outline" size="sm" onClick={() => setView("history")}>
            <History className="h-4 w-4" />
            历史记录
          </Button>
        )}
      </div>

      {/* Upload View */}
      {view === "upload" && (
        <div className="space-y-4">
          <UploadZone onFileAccepted={handleFileUpload} isProcessing={false} />
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700">
              {error}
            </div>
          )}
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="text-sm text-blue-700">
              <p className="font-medium mb-1">使用提示</p>
              <ul className="list-disc list-inside space-y-1 text-blue-600">
                <li>拍照时请确保报告文字清晰可读</li>
                <li>支持血常规、生化、影像等各类检查报告</li>
                <li>AI 分析结果仅供参考，具体情况请咨询医生</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Analyzing View */}
      {view === "analyzing" && (
        <Card>
          <CardContent className="py-12">
            <div className="flex flex-col items-center gap-4">
              <Spinner className="h-8 w-8" />
              <div className="text-center">
                <p className="font-medium text-gray-900">正在分析报告...</p>
                <p className="text-sm text-gray-500 mt-1">
                  AI 正在识别并解读您的检查报告，请稍候
                </p>
              </div>
              {ocrText && (
                <details className="w-full max-w-md mt-4">
                  <summary className="text-sm text-gray-400 cursor-pointer hover:text-gray-600">
                    查看识别文本
                  </summary>
                  <pre className="mt-2 p-3 bg-gray-50 rounded-lg text-xs text-gray-600 overflow-auto max-h-40 whitespace-pre-wrap">
                    {ocrText}
                  </pre>
                </details>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Result View */}
      {view === "result" && currentReport?.analysis && (
        <AnalysisResult analysis={currentReport.analysis} />
      )}

      {/* History View */}
      {view === "history" && (
        <div className="space-y-3">
          {reports.length === 0 ? (
            <EmptyState
              icon={<FileText className="h-12 w-12" />}
              title="暂无记录"
              description="上传检查报告后，历史记录会显示在这里"
            />
          ) : (
            reports.map((report) => (
              <Card
                key={report.id}
                onClick={() => viewHistoryReport(report)}
                className="cursor-pointer hover:shadow-md transition-shadow"
              >
                <CardContent className="flex items-center justify-between py-4">
                  <div>
                    <p className="font-medium text-gray-900">{report.title}</p>
                    <p className="text-sm text-gray-500">
                      {formatDateTime(report.createdAt)}
                    </p>
                  </div>
                  {report.analysis && (
                    <p className="text-sm text-gray-500 max-w-[200px] truncate">
                      {report.analysis.summary}
                    </p>
                  )}
                </CardContent>
              </Card>
            ))
          )}
        </div>
      )}
    </div>
  );
}
