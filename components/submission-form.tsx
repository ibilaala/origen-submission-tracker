"use client"

import { useState, useTransition } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Plus, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { createSubmission } from "@/app/actions/submissions"
import { submissionSchema, type SubmissionFormData } from "@/lib/validations"
import { useToast } from "@/hooks/use-toast"
import type { Submission } from "@/lib/db"

interface SubmissionFormProps {
  pagePath: string
  onSuccess?: (submission: Submission) => void
}

export function SubmissionForm({ pagePath, onSuccess }: SubmissionFormProps) {
  const [open, setOpen] = useState(false)
  const [isPending, startTransition] = useTransition()
  const { toast } = useToast()

  const isCompanyPage = pagePath === "/for-companies"

  const form = useForm<SubmissionFormData>({
    resolver: zodResolver(submissionSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company_name: "",
      position: "",
      accepts_marketing: false,
      page_path: pagePath,
    },
  })

  const onSubmit = (data: SubmissionFormData) => {
    startTransition(async () => {
      const result = await createSubmission(data)

      if (result.success) {
        toast({
          title: "Success!",
          description: "Your submission has been recorded and will appear in the list.",
        })
        form.reset({
          name: "",
          email: "",
          phone: "",
          company_name: "",
          position: "",
          accepts_marketing: false,
          page_path: pagePath,
        })
        setOpen(false)

        // Call the success callback to update the parent component
        if (onSuccess && result.data) {
          onSuccess(result.data as Submission)
        }
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to submit form. Please try again.",
          variant: "destructive",
        })
      }
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="mb-6">
          <Plus className="mr-2 h-4 w-4" />
          Add New Submission
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{isCompanyPage ? "Company Submission" : "Client Submission"}</DialogTitle>
          <DialogDescription>Fill out the form below to submit your information.</DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name *</Label>
            <Input id="name" {...form.register("name")} placeholder="Enter your full name" disabled={isPending} />
            {form.formState.errors.name && <p className="text-sm text-red-500">{form.formState.errors.name.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              {...form.register("email")}
              placeholder="Enter your email address"
              disabled={isPending}
            />
            {form.formState.errors.email && (
              <p className="text-sm text-red-500">{form.formState.errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone *</Label>
            <Input id="phone" {...form.register("phone")} placeholder="Enter your phone number" disabled={isPending} />
            {form.formState.errors.phone && (
              <p className="text-sm text-red-500">{form.formState.errors.phone.message}</p>
            )}
          </div>

          {isCompanyPage && (
            <>
              <div className="space-y-2">
                <Label htmlFor="company_name">Company Name *</Label>
                <Input
                  id="company_name"
                  {...form.register("company_name")}
                  placeholder="Enter your company name"
                  disabled={isPending}
                />
                {form.formState.errors.company_name && (
                  <p className="text-sm text-red-500">{form.formState.errors.company_name.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="position">Position *</Label>
                <Input
                  id="position"
                  {...form.register("position")}
                  placeholder="Enter your position"
                  disabled={isPending}
                />
                {form.formState.errors.position && (
                  <p className="text-sm text-red-500">{form.formState.errors.position.message}</p>
                )}
              </div>
            </>
          )}

          <div className="flex items-center space-x-2">
            <Checkbox
              id="accepts_marketing"
              checked={form.watch("accepts_marketing")}
              onCheckedChange={(checked) => form.setValue("accepts_marketing", checked as boolean)}
              disabled={isPending}
            />
            <Label htmlFor="accepts_marketing" className="text-sm">
              I accept marketing communications
            </Label>
          </div>

          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isPending ? "Submitting..." : "Submit"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
