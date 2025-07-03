import { z } from "zod"

export const submissionSchema = z
  .object({
    name: z.string().min(1, "Name is required").max(255),
    email: z.string().email("Invalid email address").max(255),
    phone: z.string().min(1, "Phone is required").max(20),
    company_name: z.string().max(255).optional(),
    position: z.string().max(255).optional(),
    accepts_marketing: z.boolean().default(false),
    page_path: z.string().min(1, "Page path is required"),
  })
  .refine(
    (data) => {
      if (data.page_path === "/for-companies") {
        return data.company_name && data.company_name.length > 0 && data.position && data.position.length > 0
      }
      if (data.page_path === "/for-clients") {
        return !data.company_name && !data.position
      }
      return true
    },
    {
      message: "Company name and position are required for companies page",
      path: ["company_name"],
    },
  )

export type SubmissionFormData = z.infer<typeof submissionSchema>
