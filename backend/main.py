from fastapi import FastAPI
from pydantic import BaseModel
from typing import List, Optional

app = FastAPI(title="AgriSmart Tha Mai API")

class LogEntry(BaseModel):
    date: str
    activity_type: str
    details: str
    cost: Optional[float] = 0.0

farm_logs_db = []

@app.get("/api/weather/tha-mai")
def get_tha_mai_weather(stage: str = "fruit_growth"):
    # ค่าจำลองสภาพอากาศ อ.ท่าใหม่ (ในใช้งานจริงจะเชื่อม API กรมอุตุฯ)
    temp = 34.0
    humidity = 88.0
    wind_speed = 22.0
    rain_chance = 70.0

    # ตรวจจับภัย 3 รูปแบบ
    alerts = []

    # 1. 🌪️ สภาพอากาศวิกฤต (ลมกระโชกแรง / ฝนตกหนัก)
    if wind_speed > 20.0:
        alerts.append({
            "id": "extreme_wind",
            "title": "🌪️ เตือนภัยลมกระโชกแรง (อ.ท่าใหม่)",
            "body": f"ความเร็วลมสูงถึง {wind_speed} กม./ชม. เสี่ยงต่อกิ่งฉีกหักและผลทุเรียนร่วง ควรโยงกิ่งและค้ำยันผลด่วน",
            "type": "weather"
        })

    # 2. 🐛 ศัตรูพืชระบาด (เพลี้ยไฟ / เพลี้ยไก่แจ้ ช่วงร้อนแล้ง)
    if temp > 33.0 and humidity < 50.0:
        alerts.append({
            "id": "pest_warning",
            "title": "🐛 ระวังเพลี้ยไฟและเพลี้ยไก่แจ้ระบาด",
            "body": "สภาพอากาศร้อนแล้ง เหมาะแก่การระบาดของเพลี้ยไฟในระยะดอกและผลอ่อน หมั่นตรวจใต้ใบและช่อดอก",
            "type": "pest"
        })

    # 3. 🚨 โรคพืชระบาด (โรครากเน่าโคนเน่า / โรคราใบติด ช่วงชื้นสูง)
    if humidity >= 85.0:
        alerts.append({
            "id": "disease_warning",
            "title": "🚨 เตือนภัยโรครากเน่าโคนเน่า & ราใบติด",
            "body": "ความชื้นสัมพัทธ์สูงเกิน 85% เสี่ยงเกิดเชื้อรา Phytophthora และราใบติด หลีกเลี่ยงการให้น้ำเพิ่มฉ่ำเกินไป",
            "type": "disease"
        })

    # คำนวณน้ำตามระยะทุเรียน
    kc_mapping = {"leaf_flushing": 0.75, "flowering": 0.65, "fruit_growth": 0.95, "harvesting": 0.60}
    kc = kc_mapping.get(stage, 0.85)
    etc_mm = 4.5 * kc
    water_liters = round(etc_mm * 19.63, 1)

    return {
        "location": {"district": "อำเภอท่าใหม่", "province": "จันทบุรี"},
        "weather": {
            "temperature": temp,
            "humidity": humidity,
            "wind_speed": wind_speed,
            "rain_chance": rain_chance,
            "condition": "ลมแรง และความชื้นสะสมสูง"
        },
        "active_alerts": alerts,
        "irrigation_advice": {
            "water_needed_liters": water_liters,
            "recommendation": f"ปริมาณน้ำแนะนำ: ~{water_liters} ลิตร/ต้น/วัน",
            "tip": "ตรวจสอบการระบายน้ำบริเวณโคนต้นเพื่อป้องกันน้ำขวัง"
        }
    }

@app.get("/api/logs")
def get_logs():
    return {"logs": farm_logs_db}

@app.post("/api/logs")
def add_log(entry: LogEntry):
    farm_logs_db.append(entry.dict())
    return {"status": "success"}
  