import { Tests } from "@prisma/client";

export type TestType =  Omit< Tests, "id">  