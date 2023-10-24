import PayRequest, { getServerSideProps, Props } from '../../pay/[pay_code]'

export { getServerSideProps }

export default function PayMe({ payRequest, ogData }: Props) {
  return <PayRequest payRequest={payRequest} ogData={ogData} isPayMe />
}
