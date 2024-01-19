import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * #### Handle TailwindCSS ClassNames Conflict in Components
 *
 * <div className={cn(string | string[] | {string: boolean} )} />
 *
 * @return {string}
 */
type Props = Array<string | boolean | null | undefined | unknown[]>;

export function cn(...inputs: Props): string {
  return twMerge(clsx(inputs));
}