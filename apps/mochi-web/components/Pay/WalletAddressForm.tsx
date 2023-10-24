import { utils } from 'ethers'
import { useForm } from 'react-hook-form'
import Button from '~cpn/base/button'
import Field from '~components/Dashboard/Form/Field'
import { Input } from '~components/Dashboard/Input'
import { isSolAddress } from '~utils/sol'

type FormValue = {
  walletAddress: string
}

export default function WalletAddressForm({
  onSubmit,
  onCancel,
}: {
  onSubmit: (values: FormValue) => Promise<void>
  onCancel: () => void
}) {
  const { handleSubmit, control } = useForm<FormValue>()

  return (
    <div className="flex flex-col p-4 bg-white rounded-2xl md:p-6 min-w-[300px] md:min-w-[400px]">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-2 mb-6">
          <Field
            name="walletAddress"
            rules={{
              required: 'Required',
              validate: (v) => {
                if (!utils.isAddress(v) && !isSolAddress(v))
                  return 'Enter EVM/Solana address'
                return true
              },
            }}
            label="Recipient's public key"
            control={control}
          >
            <Input placeholder="Enter wallet address" />
          </Field>
        </div>
        <div className="flex gap-x-2 justify-end">
          <Button type="button" appearance="gray" onClick={onCancel}>
            Cancel
          </Button>
          <Button appearance="secondary" type="submit">
            Claim
          </Button>
        </div>
      </form>
    </div>
  )
}
