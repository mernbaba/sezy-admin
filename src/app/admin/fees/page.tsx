import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table-dense";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Info } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Close } from "@radix-ui/react-popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// const forexFees = [
//   {
//     currency: "USD",
//     country: "United States",
//     rate: "85.70",
//   },
//   {
//     currency: "EUR",
//     country: "European Union",
//     rate: "100.00",
//   },
//   {
//     currency: "GBP",
//     country: "United Kingdom",
//     rate: "120.00",
//   },
//   {
//     currency: "JPY",
//     country: "Japan",
//     rate: "0.78",
//   },
//   {
//     currency: "CNY",
//     country: "China",
//     rate: "12.50",
//   },
//   {
//     currency: "AUD",
//     country: "Australia",
//     rate: "65.00",
//   },
//   {
//     currency: "CAD",
//     country: "Canada",
//     rate: "75.00",
//   },
//   {
//     currency: "ZAR",
//     country: "South Africa",
//     rate: "5.00",
//   },
//   {
//     currency: "NZD",
//     country: "New Zealand",
//     rate: "60.00",
//   },
//   {
//     currency: "CHF",
//     country: "Switzerland",
//     rate: "95.00",
//   },
//   {
//     currency: "SEK",
//     country: "Sweden",
//     rate: "10.00",
//   },
//   {
//     currency: "NOK",
//     country: "Norway",
//     rate: "10.00",
//   },
//   {
//     currency: "DKK",
//     country: "Denmark",
//     rate: "10.00",
//   },
//   {
//     currency: "SGD",
//     country: "Singapore",
//     rate: "65.00",
//   },
//   {
//     currency: "HKD",
//     country: "Hong Kong",
//     rate: "10.00",
//   },
//   {
//     currency: "KRW",
//     country: "South Korea",
//     rate: "0.10",
//   },
//   {
//     currency: "BRL",
//     country: "Brazil",
//     rate: "15.00",
//   },
//   {
//     currency: "RUB",
//     country: "Russia",
//     rate: "1.00",
//   },
//   {
//     currency: "TRY",
//     country: "Turkey",
//     rate: "10.00",
//   },
//   {
//     currency: "MXN",
//     country: "Mexico",
//     rate: "5.00",
//   },
// ];
export const revalidate = 30;
export const dynamicParams = true;
const Page = async () => {
  const currencies = await prisma.currency.findMany({
    orderBy: {
      createdAt: "asc",
    },
  });

  const fee = await prisma.fee.findMany({
    orderBy: {
      createdAt: "asc",
    },
  });

  const upadateFee = async (formData: FormData) => {
    "use server";

    const feeId = formData.get("feeId");
    const amount = formData.get("amount");

    try {
      await prisma.fee.update({
        where: {
          feeId: feeId as string,
        },
        data: {
          amount: Number(amount),
        },
      });

      revalidatePath("/admin/fees");

      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const updateForexRate = async (formData: FormData) => {
    "use server";

    const currencyId = formData.get("currencyId");
    const forexRate = formData.get("forexRate");

    try {
      await prisma.currency.update({
        where: {
          currencyId: currencyId as string,
        },
        data: {
          forexRate: Number(forexRate),
        },
      });

      revalidatePath("/admin/fees");

      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  return (
    <div className="bg-white">
      <div className="sticky top-0 z-10 flex gap-4 items-center bg-white p-3">
        <SidebarTrigger className="aspect-square p-2 hover:bg-stone-100" />
        <h1 className="text-xl">Set Fees</h1>
      </div>

      <div className="p-4">
        <h2 className="w-4/5 block mx-auto text-2xl font-medium mb-4">
          Set Constant Fees
        </h2>
        <div className="w-4/5 mx-auto overflow-hidden rounded-lg border border-border bg-background">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="h-9 py-2">Currency</TableHead>
                <TableHead className="h-9 py-2">Rate</TableHead>
                <TableHead className="h-9 py-2">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {fee.map((f, key) => (
                <TableRow key={key}>
                  <TableCell className="py-2">
                    <span className="h-full my-auto font-medium flex gap-2 items-center">
                      {f.name}

                      {f.info !== null && (
                        <Popover>
                          <PopoverTrigger>
                            <Info className="size-4" />
                          </PopoverTrigger>
                          <PopoverContent className="prose max-h-[400px] min-w-[220px] max-w-[400px] overflow-auto text-sm prose-no-margin">
                            {f.info}
                          </PopoverContent>
                        </Popover>
                      )}
                    </span>
                  </TableCell>
                  <TableCell className="py-2">{f.amount}</TableCell>
                  <TableCell className="py-2">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="secondary" size="sm">
                          Edit
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-72">
                        <form
                          className="space-y-3"
                          action={async (formData) => {
                            "use server";
                            await upadateFee(formData);
                          }}
                        >
                          <Input
                            type="hidden"
                            name="feeId"
                            defaultValue={f.feeId}
                          />
                          <Input
                            type="text"
                            name="amount"
                            defaultValue={f.amount}
                          />
                          <div className="flex flex-col sm:flex-row sm:justify-end">
                            <Close asChild>
                              <Button type="submit" size="sm">
                                Save
                              </Button>
                            </Close>
                          </div>
                        </form>
                      </PopoverContent>
                    </Popover>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <div className="p-4">
        <h2 className="w-4/5 block mx-auto text-2xl font-medium mb-4">
          Set Forex Rate
        </h2>
        <div className="w-4/5 mx-auto overflow-hidden rounded-lg border border-border bg-background">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="h-9 py-2">Currency</TableHead>
                <TableHead className="h-9 py-2">Country</TableHead>
                <TableHead className="h-9 py-2">Rate</TableHead>
                <TableHead className="h-9 py-2">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currencies.map((curr, key) => (
                <TableRow key={key}>
                  <TableCell className="py-2 font-medium">
                    <span className="h-full my-auto font-medium flex gap-2 items-center">
                      <span className="bg-blue-300/40 text-blue-900 rounded-md w-12 text-center py-0.5">
                        {curr.code}
                      </span>

                      {curr.name !== null && (
                        <Popover>
                          <PopoverTrigger>
                            <Info className="size-4" />
                          </PopoverTrigger>
                          <PopoverContent className="prose max-h-[400px] min-w-[220px] max-w-[400px] overflow-auto text-sm prose-no-margin">
                            {curr.name}
                          </PopoverContent>
                        </Popover>
                      )}
                    </span>
                  </TableCell>
                  <TableCell className="py-2">{curr.country}</TableCell>
                  <TableCell className="py-2">{curr.forexRate}</TableCell>
                  <TableCell className="py-2">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="secondary" size="sm">
                          Edit
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-56">
                        <form
                          className="flex gap-4"
                          action={async (formData) => {
                            "use server";
                            await updateForexRate(formData);
                          }}
                        >
                          <Input
                            type="hidden"
                            name="currencyId"
                            defaultValue={curr.currencyId}
                          />
                          <Input
                            type="text"
                            name="forexRate"
                            defaultValue={curr.forexRate}
                          />
                          <div className="flex flex-col sm:flex-row sm:justify-end">
                            <Close asChild>
                              <Button type="submit" size="sm">
                                Update
                              </Button>
                            </Close>
                          </div>
                        </form>
                      </PopoverContent>
                    </Popover>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default Page;
