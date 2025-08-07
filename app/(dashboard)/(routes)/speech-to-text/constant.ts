import * as z from 'zod';

export const formSchema = z.object({
  file: z
    .any()
    .refine((file) => file instanceof File, {
      message: 'Audio file is required',
    }),
});
