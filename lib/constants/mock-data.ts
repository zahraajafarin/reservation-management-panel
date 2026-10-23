import type { Reservation } from "@/types/reservation";
import { getDaysFromToday } from "../utils/date";


export const MOCK_RESERVATIONS: Reservation[] = [
  { id: "r1", customerName: "سارا محمدی", customerPhone: "09121110001", service: "ویزیت عمومی", date: getDaysFromToday(-5), time: "09:00", status: "confirmed", description: "اولین مراجعه" },
  { id: "r2", customerName: "علی رضایی", customerPhone: "09121110002", service: "مشاوره تخصصی", date: getDaysFromToday(-4), time: "10:30", status: "pending" },
  { id: "r3", customerName: "مریم احمدی", customerPhone: "09121110003", service: "معاینه دوره‌ای", date: getDaysFromToday(-8), time: "12:00", status: "confirmed", description: "همراه با سوابق آزمایش" },
  { id: "r4", customerName: "حسین کریمی", customerPhone: "09121110004", service: "فیزیوتراپی", date: getDaysFromToday(-8), time: "16:15", status: "cancelled", description: "بیمار اعلام انصراف کرد" },
  { id: "r5", customerName: "نرگس صادقی", customerPhone: "09121110005", service: "آزمایش", date: getDaysFromToday(-1), time: "08:30", status: "pending" },
  { id: "r6", customerName: "رضا حیدری", customerPhone: "09121110006", service: "ویزیت عمومی", date: getDaysFromToday(-1), time: "11:00", status: "confirmed" },
  { id: "r7", customerName: "زهرا نوری", customerPhone: "09121110007", service: "مشاوره تخصصی", date: getDaysFromToday(-2), time: "14:00", status: "pending", description: "درخواست ویزیت آنلاین" },
  { id: "r8", customerName: "محمد قاسمی", customerPhone: "09121110008", service: "فیزیوتراپی", date: getDaysFromToday(-3), time: "17:30", status: "confirmed" },
  { id: "r9", customerName: "فاطمه جعفری", customerPhone: "09121110009", service: "معاینه دوره‌ای", date: getDaysFromToday(-1), time: "09:45", status: "confirmed", description: "مراجعه‌ی مجدد" },
  { id: "r10", customerName: "امیر حسینی", customerPhone: "09121110010", service: "آزمایش", date: getDaysFromToday(-2), time: "13:15", status: "cancelled" },
  { id: "r11", customerName: "الهام یوسفی", customerPhone: "09121110011", service: "ویزیت عمومی", date: getDaysFromToday(-3), time: "15:00", status: "confirmed" },
  { id: "r12", customerName: "پوریا موسوی", customerPhone: "09121110012", service: "مشاوره تخصصی", date: getDaysFromToday(-5), time: "10:00", status: "cancelled", description: "تغییر برنامه" },
];