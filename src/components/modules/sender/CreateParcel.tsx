// CreateParcel.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader2, CalendarIcon } from "lucide-react";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useCreateParcelMutation } from "@/redux/features/parcels/parcelApi";
import { useGetAllReceiversQuery } from "@/redux/features/users/usersApi";
import LoadingSpinner from "@/components/LoadingSpinner";

// Zod Schema
const parcelSchema = z.object({
  receiver: z.string().min(1, "Receiver ID is required"),
  senderAddress: z.string().min(1, "Sender address is required"),
  receiverAddress: z.string().min(1, "Receiver address is required"),
  type: z.enum(["document", "package", "fragile", "food", "electronics"]),
  weight: z.string().min(1, "Weight is required"),
  price: z.string().min(1, "Price is required"),
  deliveryCharge: z.string().min(1, "Delivery charge is required"),
  deliveryDate: z.date({ message: "Delivery date is required" }),
  isPaid: z.boolean().optional(),
});

type ParcelFormValues = z.infer<typeof parcelSchema>;

const CreateParcel = () => {
  const [createParcel, { isLoading }] = useCreateParcelMutation();
  const { data: receiversData } = useGetAllReceiversQuery({
    role: "RECEIVER",
    page: 1,
    limit: 50,
  });

  const receivers: any[] = Array.isArray(receiversData)
    ? receiversData
    : Array.isArray(receiversData?.data)
    ? receiversData!.data
    : [];

  const form = useForm<ParcelFormValues>({
    resolver: zodResolver(parcelSchema),
    defaultValues: {
      receiver: "",
      senderAddress: "",
      receiverAddress: "",
      type: "package",
      weight: "",
      price: "",
      deliveryCharge: "",
      deliveryDate: new Date(),
      isPaid: false,
    },
  });

  const handleSubmit = async (data: ParcelFormValues) => {
    const toastId = toast.loading("Creating parcel...");
    try {
      const payload = {
        ...data,
        type: data.type.toUpperCase(),
        weight: Number(data.weight),
        price: Number(data.price),
        deliveryCharge: Number(data.deliveryCharge),
        deliveryDate: new Date(data.deliveryDate).toISOString(),
      };

      const response = await createParcel(payload).unwrap();
      toast.success(response?.message || "Parcel created successfully!", {
        id: toastId,
      });
      form.reset();
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to create parcel", {
        id: toastId,
      });
    }
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-80">
        <LoadingSpinner />
      </div>
    );

  return (
    <div className="w-full max-w-3xl mx-auto px-5">
      <Card className="rounded-[2.5px] border dark:bg-[#101828] bg-white">
        <CardHeader>
          <CardTitle className="text-3xl text-center font-bold text-gray-800 dark:text-white mb-2">
            Create New Parcel
          </CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-400 text-center">
            Add parcel details for delivery management
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form
              id="create-parcel-form"
              className="space-y-5"
              onSubmit={form.handleSubmit(handleSubmit)}
            >
              {/* Receiver */}
              <FormField
                control={form.control}
                name="receiver"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Receiver</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full rounded-[2.5px] dark:bg-[#101828]">
                          <SelectValue placeholder="Select receiver" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="dark:bg-[#101828] rounded-[2.5px] max-h-60 overflow-auto">
                        {receivers.map((user) => (
                          <SelectItem key={user._id} value={user._id}>
                            {user.name} ({user.email})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Type & Weight */}
              <div className="flex gap-5">
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Parcel Type</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="rounded-[2.5px] dark:bg-[#101828]">
                            <SelectValue placeholder="Select parcel type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="dark:bg-[#101828] rounded-[2.5px]">
                          <SelectItem value="document">Document</SelectItem>
                          <SelectItem value="package">Package</SelectItem>
                          <SelectItem value="fragile">Fragile</SelectItem>
                          <SelectItem value="food">Food</SelectItem>
                          <SelectItem value="electronics">
                            Electronics
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="weight"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Weight (kg)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="0.1"
                          className="rounded-[2.5px] dark:bg-[#101828]"
                          placeholder="e.g. 2.5"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Price & Delivery Charge */}
              <div className="flex gap-5">
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Item Price (৳)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          className="rounded-[2.5px] dark:bg-[#101828]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="deliveryCharge"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Delivery Charge (৳)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          className="rounded-[2.5px] dark:bg-[#101828]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Delivery Date */}
              <FormField
                control={form.control}
                name="deliveryDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Delivery Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full rounded-[2.5px] dark:bg-[#101828] pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              field.value.toDateString()
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent
                        align="start"
                        className="w-auto p-0 dark:bg-[#101828] rounded-[2.5px]"
                      >
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date <
                            new Date(
                              new Date().setDate(new Date().getDate() - 1)
                            )
                          }
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Sender & Receiver Address */}
              <FormField
                control={form.control}
                name="senderAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sender Address</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter sender full address"
                        className="rounded-[2.5px] dark:bg-[#101828]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="receiverAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Receiver Address</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter receiver full address"
                        className="rounded-[2.5px] dark:bg-[#101828]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Payment */}
              <FormField
                control={form.control}
                name="isPaid"
                render={({ field }) => (
                  <FormItem className="flex items-center gap-2">
                    <FormControl>
                      <input
                        type="checkbox"
                        checked={field.value}
                        onChange={field.onChange}
                        className="w-4 h-4 accent-primary"
                      />
                    </FormControl>
                    <FormLabel className="mt-1">Mark as Paid</FormLabel>
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </CardContent>

        <CardFooter className="flex justify-end">
          <Button
            type="submit"
            form="create-parcel-form"
            disabled={isLoading}
            className="rounded-[2.5px] cursor-pointer"
          >
            {isLoading ? (
              <Loader2 className="animate-spin mr-2" />
            ) : (
              "Create Parcel"
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CreateParcel;
