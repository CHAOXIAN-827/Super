import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "未上传文件" }, { status: 400 });
    }

    // For demo: return a sample OCR text
    // In production, use Tesseract.js or a cloud OCR service
    const sampleOcrText = `
体检报告

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
3. 定期复查血压、血脂
    `.trim();

    return NextResponse.json({ text: sampleOcrText });
  } catch (error) {
    console.error("OCR error:", error);
    return NextResponse.json(
      { error: "图片识别失败，请重试" },
      { status: 500 }
    );
  }
}
