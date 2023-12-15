import PayRequest, { getServerSideProps, Props } from '../../pay/[pay_code]'

export { getServerSideProps }

export default function PayMe({ payRequest }: Props) {
  return <PayRequest payRequest={payRequest} />
}

PayMe.layoutType = 'landing'
