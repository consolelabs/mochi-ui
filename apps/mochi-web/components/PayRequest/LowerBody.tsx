import { truncate } from '@dwarvesf/react-utils'
import { Badge, Typography } from '@mochi-ui/core'
import DataList from '~cpn/DataList'
import { LinkLine } from '@mochi-ui/icons'
import DashLine from '~cpn/DashLine'
import Link from 'next/link'
import { PayRequest } from './type'

type Props = {
  data: PayRequest
}

export default function LowerBody({ data }: Props) {
  return (
    <div className="flex flex-col gap-y-2 py-3 mt-9 receipt-body">
      <DashLine />
      <DataList>
        <DataList.Item
          title={data.type === 'paylink' ? 'Issued by' : 'Request send to'}
        >
          <Link
            href="TODO"
            className="flex gap-x-1 items-center underline text-xxxs decoration-from-font text-neutral-600"
          >
            {data.profile?.name ?? 'User'}
            <LinkLine />
          </Link>
        </DataList.Item>
        <DataList.Item title="Recipients">
          <Typography level="p7" color="textSecondary" fontWeight="sm">
            {data.claimer ? truncate(data.claimer, 10, true) : '⎯'}
          </Typography>
        </DataList.Item>
      </DataList>
      <DataList>
        <DataList.Item title="Amount">
          <Typography level="p7" color="textSecondary" fontWeight="sm">
            {data.amountDisplay} {data.token.symbol}
          </Typography>
        </DataList.Item>
        <div className="pt-3 w-full h-0" />
        <DataList.Item title="Tx ID">
          <Typography
            level="p7"
            color="textSecondary"
            fontWeight="sm"
            className="underline"
          >
            {data.code.slice(0, 9)}
          </Typography>
        </DataList.Item>
        <DataList.Item title="Date">{data.date}</DataList.Item>
        <DataList.Item title="Status">
          {data.claim_tx ? (
            <Badge
              className={
                data.claim_tx
                  ? '!bg-[#088752]/[.15] !text-[#34C77B]'
                  : '!bg-[#E02D3C]/[.15] !text-[#EB5757]'
              }
              appearance={data.claim_tx ? 'success' : 'danger'}
              label={data.claim_tx ? 'Success' : 'Failed'}
            />
          ) : (
            <Typography
              level="p7"
              color="textSecondary"
              fontWeight="sm"
              className="capitalize"
            >
              {data.status}
            </Typography>
          )}
        </DataList.Item>
        {data.note && (
          <DataList.Item title="Message">
            <q className="text-right text-xxxs">{data.note}</q>
          </DataList.Item>
        )}
      </DataList>
    </div>
  )
}
