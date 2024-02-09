'use client';

import { cn } from '@/lib/utils';

import Button from "@/components/Button";

interface FormNewsletterProps {
  className?: string;
}

const FormNewsletter = ({ className }: FormNewsletterProps) => {
  return (
    <form className={cn(className)}>
      <div className="mb-6">
        <label className="block text-sm font-semibold mb-3" htmlFor="email">Email Address</label>
        <input id="email" type="email" name="email" className="w-full max-w-64 rounded" />
      </div>
      <div>
        <Button className="w-full max-w-64 xl:w-auto xl:max-w-none">Submit</Button>
      </div>
    </form>
  )
}

export default FormNewsletter;