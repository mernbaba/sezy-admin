"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { uploadFile } from "@/lib/uploadFile";
import { useState } from "react";
import { addAgent } from "@/actions/agents";
import { useRouter } from "next/navigation";

interface Agent {
  firstName: string;
  middleName: string;
  lastName: string;
  businessName: string;
  businessDocumentType: string;
  businessDocumentNumber: string;
  postalAddress: string;
  physicalAddress: string;
  country: string;
  phone: string;
  email: string;
  password: string;
  nationalId: string;
  businessDocument: string;
  image: string;
}

export const revalidate = 30;
export const dynamicParams = true;

const Page = () => {
  const [agent, setAgent] = useState<Agent>({
    firstName: "",
    middleName: "",
    lastName: "",
    businessName: "",
    businessDocumentType: "",
    businessDocumentNumber: "",
    postalAddress: "",
    physicalAddress: "",
    country: "",
    phone: "",
    email: "",
    password: "",
    nationalId: "",
    businessDocument: "",
    image: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  const handleFileChange = async ({ file }: { file: File | null }) => {
    try {
      if (!file) throw new Error("Function: handleFileChange expects a file");

      if (file.size > 2 * 1024 * 1024) {
        throw new Error("File size must not exceed 2MB");
      }

      const reader = new FileReader();

      reader.onloadend = () => console.log("File loaded");

      reader.readAsDataURL(file);

      const fileExt = file.name.split(".").pop();

      const fileUrl = await uploadFile({ file, fileExt, folderPath: "agents" });

      return { url: fileUrl };
    } catch (err) {
      console.error("Error in handleFileChange:", err);
      return { error: err };
    }
  };

  return (
    <div>
      <div className="sticky top-0 z-10 flex gap-4 items-center bg-white p-3">
        <SidebarTrigger className="aspect-square p-2 hover:bg-stone-100" />
        <h1 className="text-xl">Agent Registration Form</h1>
      </div>

      <form
        className="bg-white flex flex-1 flex-col gap-4 m-4 p-6 rounded-lg"
        onSubmit={async (e) => {
          e.preventDefault();
          setSubmitting(true);
          console.log(agent);

          const response = await addAgent(agent);

          if (response.error) alert("Error adding agent");
          else router.push(`/admin/agents/${response?.agent?.agentId}`);

          setSubmitting(false);
        }}
      >
        <div className="flex justify-between gap-4">
          <div className="w-full space-y-2">
            <Label className="text-lg">First Name</Label>
            <Input
              type="text"
              name="firstName"
              value={agent?.firstName}
              onChange={(e) => {
                setAgent({ ...agent, firstName: e.target.value });
              }}
              required
            />
          </div>

          <div className="w-full space-y-2">
            <Label className="text-lg">Middle Name</Label>
            <Input
              type="text"
              name="middleName"
              value={agent?.middleName}
              onChange={(e) => {
                setAgent({ ...agent, middleName: e.target.value });
              }}
            />
          </div>

          <div className="w-full space-y-2">
            <Label className="text-lg">Last Name</Label>
            <Input
              type="text"
              name="lastName"
              value={agent?.lastName}
              onChange={(e) => {
                setAgent({ ...agent, lastName: e.target.value });
              }}
              required
            />
          </div>
        </div>

        <div className="flex justify-between gap-4">
          <div className="w-full space-y-2">
            <Label className="text-lg">Business Name</Label>
            <Input
              type="text"
              name="businessName"
              value={agent?.businessName}
              onChange={(e) => {
                setAgent({ ...agent, businessName: e.target.value });
              }}
              required
            />
          </div>

          <div className="w-full space-y-2">
            <Label className="text-lg">Business Document Type</Label>
            <Select
              name="businessDocumentType"
              value={agent?.businessDocumentType}
              onValueChange={(value) => {
                setAgent({ ...agent, businessDocumentType: value });
              }}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Document Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="national-id">National ID</SelectItem>
                <SelectItem value="passport">Passport</SelectItem>
                <SelectItem value="business-certificate">
                  Business Certificate
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="w-full space-y-2">
            <Label className="text-lg">Business Document Type Number</Label>
            <Input
              type="text"
              name="businessDocumentNumber"
              value={agent?.businessDocumentNumber}
              onChange={(e) => {
                setAgent({
                  ...agent,
                  businessDocumentNumber: e.target.value,
                });
              }}
              required
            />
          </div>
        </div>

        <div className="flex justify-between gap-4">
          <div className="w-full space-y-2">
            <Label className="text-lg">Postal Address</Label>
            <Input
              type="text"
              name="postalAddress"
              value={agent?.postalAddress}
              onChange={(e) => {
                setAgent({ ...agent, postalAddress: e.target.value });
              }}
              required
            />
          </div>

          <div className="w-full space-y-2">
            <Label className="text-lg">Physical Address</Label>
            <Input
              type="text"
              name="physicalAddress"
              value={agent?.physicalAddress}
              onChange={(e) => {
                setAgent({ ...agent, physicalAddress: e.target.value });
              }}
              required
            />
          </div>

          <div className="w-full space-y-2">
            <Label className="text-lg">Country</Label>
            <Input
              type="text"
              name="country"
              value={agent?.country}
              onChange={(e) => {
                setAgent({ ...agent, country: e.target.value });
              }}
              required
            />
          </div>
        </div>

        <div className="flex justify-between gap-4">
          <div className="w-full space-y-2">
            <Label className="text-lg">Phone Number</Label>
            <Input
              type="tel"
              name="phone"
              value={agent?.phone}
              onChange={(e) => {
                setAgent({ ...agent, phone: e.target.value });
              }}
              required
            />
          </div>

          <div className="w-full space-y-2">
            <Label className="text-lg">Email</Label>
            <Input
              type="email"
              name="email"
              value={agent?.email}
              onChange={(e) => {
                setAgent({ ...agent, email: e.target.value });
              }}
              required
            />
          </div>

          <div className="w-full space-y-2">
            <Label className="text-lg">Password</Label>
            <Input
              type="password"
              name="password"
              value={agent?.password}
              onChange={(e) => {
                setAgent({ ...agent, password: e.target.value });
              }}
              required
            />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="w-full space-y-2">
            <Label className="text-lg">Upload a copy of National ID</Label>
            <Input
              type="file"
              name="nationalId"
              onChange={async (e) => {
                if (e.target.files !== null && e.target.files.length > 0) {
                  const { url, error } = await handleFileChange({
                    file: e.target.files[0],
                  });

                  if (error) {
                    alert("Error uploading file");
                  } else {
                    if (url) {
                      setAgent({ ...agent, nationalId: url });
                    }
                  }
                }
              }}
              required
            />
          </div>

          <div className="w-full space-y-2">
            <Label className="text-lg">
              Upload a copy of Business Certificate
            </Label>
            <Input
              type="file"
              name="businessDocument"
              onChange={async (e) => {
                if (e.target.files !== null && e.target.files.length > 0) {
                  const { url, error } = await handleFileChange({
                    file: e.target.files[0],
                  });

                  if (error) {
                    alert("Error uploading file");
                  } else {
                    if (url) {
                      setAgent({ ...agent, businessDocument: url });
                    }
                  }
                }
              }}
              required
            />
          </div>

          <div className="w-full space-y-2">
            <Label className="text-lg">Upload Image</Label>
            <Input
              type="file"
              name="image"
              accept="image/*"
              onChange={async (e) => {
                if (e.target.files !== null && e.target.files.length > 0) {
                  const { url, error } = await handleFileChange({
                    file: e.target.files[0],
                  });

                  if (error) {
                    alert("Error uploading file");
                  } else {
                    if (url) {
                      setAgent({ ...agent, image: url });
                    }
                  }
                }
              }}
              required
            />
          </div>
        </div>

        <div className="flex justify-end gap-4">
          {!submitting ? (
            <>
              <Button type="reset" variant={"outline"}>
                Reset
              </Button>
              <Button type="submit">Submit</Button>
            </>
          ) : (
            <Button type="button" disabled>
              Submitting...
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default Page;
