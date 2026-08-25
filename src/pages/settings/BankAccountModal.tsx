import { useState } from "react"
import { X } from "lucide-react"

import { Overlay, PageActionButton } from "@/components/common"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { bankById, settlementBanks } from "@/data/banks"

export function BankAccountModal({
  currentLabel,
  close,
  review,
}: {
  currentLabel: string
  close: () => void
  review: (draft: {
    bankId: string
    accountName: string
    accountNumber: string
  }) => void
}) {
  const [bankId, setBankId] = useState("")
  const [accountName, setAccountName] = useState("")
  const [accountNumber, setAccountNumber] = useState("")
  const bank = bankById(bankId)
  const ready =
    bankId && accountName.trim().length > 2 && accountNumber.length >= 10

  return (
    <Overlay>
      <section className="change bank-modal">
        <header>
          <div>
            <h2>Add settlement bank account</h2>
            <p>
              {currentLabel} stays live until Transflow approves this request.
            </p>
          </div>
          <button onClick={close}>
            <X />
          </button>
        </header>

        <div className="field">
          Bank
          <Select
            value={bankId || null}
            onValueChange={(value) => setBankId(String(value ?? ""))}
          >
            <SelectTrigger
              className={bank ? "bank-trigger selected" : "bank-trigger"}
            >
              {bank ? (
                <span className="bank-selected">
                  <img src={bank.logo} alt="" />
                  <b>{bank.name}</b>
                  <em>Change</em>
                </span>
              ) : (
                <SelectValue placeholder="Select a bank" />
              )}
            </SelectTrigger>
            <SelectContent
              className="bank-options"
              align="start"
              alignItemWithTrigger={false}
            >
              {settlementBanks.map((item) => (
                <SelectItem key={item.id} value={item.id}>
                  <img src={item.logo} alt="" />
                  {item.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <label className="field">
          Account name
          <input
            value={accountName}
            onChange={(e) => setAccountName(e.target.value)}
            placeholder="Acme Trading Ltd — Operating Account"
          />
        </label>
        <label className="field">
          Account number
          <input
            value={accountNumber}
            onChange={(e) =>
              setAccountNumber(e.target.value.replace(/\D/g, "").slice(0, 16))
            }
            inputMode="numeric"
            placeholder="0123456789123"
          />
        </label>

        <footer>
          <PageActionButton variant="outline" onClick={close}>
            Cancel
          </PageActionButton>
          <PageActionButton
            disabled={!ready}
            onClick={() => review({ bankId, accountName, accountNumber })}
          >
            Review & submit
          </PageActionButton>
        </footer>
      </section>
    </Overlay>
  )
}
