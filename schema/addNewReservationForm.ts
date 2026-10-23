import { getDaysFromToday, getLocalTime } from "@/lib/utils/date";
import * as yup from "yup";

export const reservationSchema = yup.object({
  customerName: yup
    .string()
    .trim()
    .required("وارد کردن نام مشتری الزامی است"),

  phone: yup
    .string()
    .required("وارد کردن شماره تماس الزامی است")
    .matches(/^09\d{9}$/, {
      message: "شماره تماس باید ۱۱ رقم و با 09 شروع شود",
    //   excludeEmptyString: true,
    }),

  serviceType: yup
    .string()
    .required("وارد کردن نوع خدمت الزامی است"),

  reservationDate: yup
    .string()
    .required("انتخاب تاریخ رزرو الزامی است")
    .test(
      "not-past-date",
      "تاریخ رزرو نمی‌تواند قبل از امروز باشد",
      (value) => !value || value >= getDaysFromToday(0)
    ),

  reservationTime: yup
    .string()
    .required("انتخاب ساعت رزرو الزامی است")
    .matches(/^([01]\d|2[0-3]):[0-5]\d$/, {
      message: "ساعت رزرو معتبر نیست",
      excludeEmptyString: true,
    })
    .test(
      "not-past-time",
      "ساعت رزرو باید از ساعت فعلی به بعد باشد",
      function (value) {
        const { reservationDate } = this.parent;

        // خطاهای خالی بودن و فرمت ساعت جداگانه بررسی می‌شوند.
        if (!value || !reservationDate) return true;

        const today = getDaysFromToday(0);

        // برای تاریخ‌های آینده، ساعت گذشته‌ی امروز اهمیتی ندارد.
        if (reservationDate > today) return true;

        // اگر تاریخ گذشته باشد، اعتبارسنجی تاریخ خطا می‌دهد.
        if (reservationDate < today) return true;

        // اگر تاریخ امروز باشد، ساعت باید جلوتر از ساعت فعلی باشد.
        return value > getLocalTime();
      }
    ),

  description: yup.string().optional(),
});

export type ReservationFormValues = yup.InferType<
  typeof reservationSchema
>;