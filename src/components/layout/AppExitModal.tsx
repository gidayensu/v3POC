import { LogOut } from "lucide-react"

import {
  BusinessLogo,
  ConfirmDialog,
  PageActionButton,
} from "@/components/common"
import { businessLogo } from "@/data/businesses"

export function AppExitModal({
  app,
  productAccessBusiness,
  returnBusiness,
  close,
  confirm,
}: {
  app: string
  /**
   * Set when the business in context is one we only hold a seat on. That
   * seat is the whole of our access to it, so leaving the application
   * leaves the business as well — the prompt has to say so.
   */
  productAccessBusiness?: string | null
  returnBusiness?: string
  close: () => void
  confirm: () => void
}) {
  /* Leaving a product-access context mirrors switching into it: the same
     mark, the same weight of heading, the same pair of buttons. */
  if (productAccessBusiness)
    return (
      <ConfirmDialog
        className="product-access-modal"
        iconClass="mx-auto block w-fit"
        icon={
          <BusinessLogo
            src={businessLogo(productAccessBusiness)}
            name={productAccessBusiness}
            className="size-14"
          />
        }
        title={`Leave ${app} and ${productAccessBusiness}?`}
        titleClass="text-[22px] leading-tight font-bold tracking-[-0.02em] text-[#101d42]"
        close={close}
        confirm={confirm}
        footer={
          <>
            <PageActionButton
              variant="outline"
              className="min-w-[120px]"
              onClick={close}
            >
              Stay here
            </PageActionButton>
            <PageActionButton className="min-w-[120px]" onClick={confirm}>
              Leave both
            </PageActionButton>
          </>
        }
      >
        <p>
          Leaving <b>{app}</b> also leaves <b>{productAccessBusiness}</b>.
          You'll return to <b>{returnBusiness}</b>.
        </p>
      </ConfirmDialog>
    )

  return (
    <ConfirmDialog
      className="app-exit-modal"
      iconClass="switch-icon"
      icon={<LogOut />}
      title={`Leave ${app}?`}
      cancelLabel="Stay here"
      confirmLabel="Leave application"
      close={close}
      confirm={confirm}
    >
      <p>
        You'll go back to the merchant workspace and the sidebar will return to
        your workspace navigation. Anything you've saved in <b>{app}</b> stays
        as it is.
      </p>
    </ConfirmDialog>
  )
}
