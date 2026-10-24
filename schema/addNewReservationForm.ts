import * as yup from "yup";
import { normalizeDigits } from "@/lib/utils/number";
import { getDaysFromToday } from "@/lib/utils/date";

export const reservationSchema = yup.object({
  customerName: yup
    .string()
    .trim()
    .required("نام مشتری را وارد کنید")
    .min(3, "نام باید حداقل ۳ حرف باشد"),

  customerPhone: yup
    .string()
    .transform((v) => normalizeDigits(v ?? "").replace(/\s|-/g, ""))
    .required("شماره تماس را وارد کنید")
    .matches(/^09\d{9}$/, "شماره موبایل معتبر نیست (مثال: 09121234567)"),

  service: yup.string().trim().required("نوع خدمت را وارد کنید"),

  date: yup
    .string()
    .required("تاریخ رزرو را انتخاب کنید")
    .test(
      "not-in-past",
      "تاریخ رزرو نمی‌تواند گذشته باشد",
      (value) => !value || value >= getDaysFromToday(0),
    ),

  time: yup
    .string()
    .required("ساعت رزرو را انتخاب کنید")
    .matches(/^([01]\d|2[0-3]):[0-5]\d$/, "ساعت معتبر نیست"),

  description: yup.string().trim().max(300, "حداکثر ۳۰۰ کاراکتر").default(""),
});

export type ReservationFormInput = yup.InferType<typeof reservationSchema>;