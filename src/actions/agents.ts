"use server";

import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";

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

export const addAgent = async (agent: Agent) => {
  try {
    const hashedPassword = await bcrypt.hash(agent?.password, 10);

    const newAgent = await prisma.agent.create({
      data: {
        firstName: agent?.firstName,
        middleName: agent?.middleName,
        lastName: agent?.lastName,
        email: agent?.email,
        phone: agent?.phone,
        password: hashedPassword,
        image: agent?.image,
        country: agent?.country,
        postalAddress: agent?.postalAddress,
        physicalAddress: agent?.physicalAddress,
        businessName: agent?.businessName,
        businessDocument: agent?.businessDocument,
        businessDocumentNumber: agent?.businessDocumentNumber,
        businessDocumentType: agent?.businessDocumentType,
        nationalId: agent?.nationalId,
      },
    });
    return { agent: newAgent };
  } catch (error) {
    console.log(error);
    return { error };
  }
};
