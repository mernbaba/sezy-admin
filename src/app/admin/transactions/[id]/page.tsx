import { Badge } from "@/components/ui/badge";
import { SidebarTrigger } from "@/components/ui/sidebar";
import prisma from "@/lib/prisma";
import Link from "next/link";

const Page = async (props: { params: Promise<{ id: string }> }) => {
  const { id } = await props?.params;

  const transaction = await prisma.transaction.findUnique({
    where: { transactionId: id },
    include: {
      Agent: true,
      Student: true,
      Currency: true,
    },
  });

  if (!transaction) {
    return <div>Transaction not found</div>;
  }

  return (
    <div className="space-y-4 bg-white">
      <div className="sticky top-0 z-10 flex gap-4 items-center bg-white p-3">
        <SidebarTrigger className="aspect-square p-2 hover:bg-stone-100" />
        <h1 className="text-xl">Transaction Details</h1>
      </div>

      <div className="p-4">
        <p>
          <strong>Transaction ID:</strong> {transaction.transactionId}
        </p>
        <p>
          <strong>Amount:</strong> {transaction.amount}
        </p>
        <p>
          <strong>Forex Rate:</strong> {transaction.forexRate}
        </p>
        <p>
          <strong>Currency:</strong> {transaction.Currency?.code}
        </p>
        <p>
          <strong>Status:</strong> {transaction.status}
        </p>

        <hr className="my-4" />

        <p>
          <strong>Remit Type:</strong> {transaction.remitType}
        </p>

        {transaction.remitType === "University" ? (
          <>
            <p>
              <strong>Program:</strong> {transaction.program}
            </p>
            <p>
              <strong>Year of Completion:</strong>{" "}
              {transaction.yearOfCompletion}
            </p>
            <p>
              <strong>Payment Type:</strong> {transaction.paymentType}
            </p>
            <p>
              <strong>University:</strong> {transaction.university}
            </p>
            <p>
              <strong>University Student ID:</strong>{" "}
              {transaction.universitystudentId}
            </p>
            <p>
              <strong>University Address:</strong>{" "}
              {transaction.universityAddress}
            </p>
            <p>
              <strong>University City:</strong> {transaction.universityCity}
            </p>
            <p>
              <strong>University Country:</strong>{" "}
              {transaction.universityCountry}
            </p>
            <p>
              <strong>Account Info:</strong> {transaction.accountInfo}
            </p>
            <p>
              <strong>Bank Name:</strong> {transaction.bankName}
            </p>
            <p>
              <strong>Bank Account Number:</strong>{" "}
              {transaction.bankAccountNumber}
            </p>
            <p>
              <strong>Bank Code:</strong> {transaction.bankCode}
            </p>
            <p>
              <strong>Bank Code Type:</strong> {transaction.bankCodeType}
            </p>
            <p>
              <strong>Bank Swift Code:</strong> {transaction.bankSwiftCode}
            </p>
            <p>
              <strong>Bank IBAN:</strong> {transaction.bankIBAN}
            </p>
            <p>
              <strong>Bank Address:</strong> {transaction.bankAddress}
            </p>
            <p>
              <strong>Bank Country:</strong> {transaction.bankCountry}
            </p>
          </>
        ) : transaction.remitType === "Accomodation" ? (
          <></>
        ) : (
          <></>
        )}

        {transaction.document1 && (
          <div>
            <strong>Document 1:</strong>{" "}
            <Badge>
              <Link href={transaction.document1}>View</Link>
            </Badge>
          </div>
        )}
        {transaction.document2 && (
          <div>
            <strong>Document 2:</strong>{" "}
            <Badge>
              <Link href={transaction.document2}>View</Link>
            </Badge>
          </div>
        )}
        {transaction.additionalDocument && (
          <div>
            <strong>Additional Document:</strong>{" "}
            <Badge>
              <Link href={transaction.additionalDocument}>View</Link>
            </Badge>
          </div>
        )}

        <hr className="my-4" />

        <p>
          <strong>Remarks:</strong> {transaction.remarks}
        </p>
        <p>
          <strong>Created At:</strong>{" "}
          {new Date(transaction.createdAt).toLocaleString()}
        </p>
        <p>
          <strong>Updated At:</strong>{" "}
          {new Date(transaction.updatedAt).toLocaleString()}
        </p>
        <p>
          <strong>Agent:</strong> {transaction.Agent?.firstName}{" "}
          {transaction.Agent?.lastName}
        </p>
        <p>
          <strong>Student:</strong> {transaction.Student?.firstName}{" "}
          <Link href={`/admin/students/${transaction?.studentId}`}>
            {transaction.Student?.lastName}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Page;
