import { z } from "zod";

const Environment = z
  .object({
    environmentName: z.string().min(1),
    account: z.string().min(12),
    region: z.string().min(1),
  })
  .strict();

export type Environment = z.infer<typeof Environment>;

export const Environments = z.array(Environment);

export type Environments = z.infer<typeof Environments>;

export const EnvironmentSecrets = z.object({});

export type EnvironmentSecrets = z.infer<typeof EnvironmentSecrets>;
