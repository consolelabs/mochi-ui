import Image from 'next/image'
import Heading from './Heading'

export default function SendAGift() {
  return (
    <section className="">
      <div className="container mx-auto max-w-5xl px-6">
        <Heading
          element="h2"
          title="Send a gift"
          subtitle="Spread the joy to your frens and show them your heartwarming affection: buy them a Starbucks, celebrate a birthday, or just be generous – because you can!"
        />
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-home-gray-600 rounded-[22px] overflow-hidden flex flex-col">
            <Image
              src="/home/tip.svg"
              alt="Tip"
              width="520"
              height="274"
              className="w-full"
            />
            <div className="mt-auto">
              <div className="text-base text-[#017AFF] font-semibold flex items-center p-4 justify-center">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  className="mr-1"
                >
                  <path
                    d="M9.7893 18.3345C14.2327 18.3345 17.9116 14.6476 17.9116 10.2122C17.9116 5.76878 14.2248 2.08984 9.78135 2.08984C5.34593 2.08984 1.66699 5.76878 1.66699 10.2122C1.66699 14.6476 5.35389 18.3345 9.7893 18.3345Z"
                    fill="#017AFF"
                  />
                  <path
                    d="M9.97254 15.3805C9.55049 15.3805 9.42308 15.0461 9.27971 14.5842L8.53917 12.1714C8.45953 11.8529 8.47543 11.7015 8.65863 11.5184L13.3329 6.47779C13.3887 6.41409 13.3887 6.34242 13.3329 6.29464C13.2852 6.26279 13.2214 6.24686 13.1578 6.3026L8.141 11.0088C7.94193 11.184 7.78267 11.184 7.48804 11.0964L5.00356 10.3478C4.55763 10.2125 4.24707 10.0691 4.24707 9.65505C4.24707 9.3206 4.5417 9.08175 4.92393 8.94632L12.8153 5.92038C13.0304 5.84075 13.2055 5.79297 13.3647 5.79297C13.6594 5.79297 13.8346 5.97612 13.8346 6.27076C13.8346 6.43001 13.7948 6.6052 13.7152 6.8202L10.7131 14.6718C10.5458 15.1097 10.3069 15.3805 9.97254 15.3805Z"
                    fill="white"
                  />
                </svg>
                Tip
              </div>
            </div>
          </div>
          <div className="bg-home-gray-600 rounded-[22px] overflow-hidden flex flex-col">
            <Image
              src="/home/pay-link.svg"
              alt="Pay Link"
              width="619"
              height="335"
              className="w-full"
            />
            <div className="mt-auto">
              <div className="text-base justify-center text-[#E87607] font-semibold flex items-center p-4">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="mr-1"
                >
                  <path
                    d="M9.99622 18.3343C14.5528 18.3343 18.3254 14.5616 18.3254 10.005C18.3254 5.4566 14.5447 1.67578 9.98806 1.67578C5.43965 1.67578 1.66699 5.4566 1.66699 10.005C1.66699 14.5616 5.44781 18.3343 9.99622 18.3343Z"
                    fill="#E87607"
                  />
                  <path
                    d="M4.3291 9.14619C4.3291 7.76613 5.32535 6.76172 6.70539 6.76172H10.1923C11.5805 6.76172 12.5685 7.76613 12.5685 9.14619C12.5685 10.5344 11.5805 11.5224 10.1923 11.5224H9.08165C8.82034 11.2775 8.79588 10.861 8.88571 10.6078H10.1514C11.017 10.6078 11.6131 10.0199 11.6131 9.14619C11.6131 8.28058 11.017 7.6763 10.1514 7.6763H6.75438C5.89696 7.6763 5.29268 8.28058 5.29268 9.14619C5.29268 10.0199 5.88879 10.6078 6.75438 10.6078H6.9422C6.90954 10.8855 6.93403 11.302 6.98303 11.5224H6.70539C5.31718 11.5224 4.3291 10.5344 4.3291 9.14619ZM7.40766 10.9264C7.40766 9.5463 8.39573 8.55006 9.77576 8.55006H10.8945C11.1477 8.77868 11.1803 9.22785 11.0742 9.46463H9.82475C8.95915 9.46463 8.36307 10.0608 8.36307 10.9264C8.36307 11.7919 8.95915 12.3962 9.82475 12.3962H13.2136C14.0792 12.3962 14.6753 11.7919 14.6753 10.9264C14.6753 10.0608 14.0874 9.46463 13.2136 9.46463H13.034C13.0748 9.06452 13.034 8.79506 12.9931 8.55006H13.2708C14.6508 8.55006 15.6389 9.5463 15.6389 10.9264C15.6389 12.3145 14.6508 13.3108 13.2708 13.3108H9.77576C8.39573 13.3108 7.40766 12.3145 7.40766 10.9264Z"
                    fill="white"
                  />
                </svg>
                Pay Link
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
