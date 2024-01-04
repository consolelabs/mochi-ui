import {
  ActionBar,
  ActionBarActionGroup,
  ActionBarBody,
  ActionBarCancelButton,
  ActionBarConfirmButton,
  ActionBarContent,
  ActionBarIcon,
  ActionBarTitle,
  ActionBarProps,
  ActionBarConfirmButtonProps,
  ActionBarCancelButtonProps,
} from '@mochi-ui/core'
import clsx from 'clsx'
import { useWarnIfUnsavedChanges } from '~hooks/useWarnIfUnsavedChanges'

type SaveBarProps = ActionBarProps & {
  onConfirm?: ActionBarConfirmButtonProps['onClick']
  onCancel?: ActionBarCancelButtonProps['onClick']
  isLoading?: boolean
}

export const SaveBar = (props: SaveBarProps) => {
  const { onConfirm, onCancel, isLoading, open, ...restProps } = props
  const { scheme, warning } = useWarnIfUnsavedChanges(open)

  return (
    <div className="sticky bottom-0 z-50">
      <ActionBar open={open} {...restProps}>
        <ActionBarContent
          scheme={scheme}
          anchorClassName="left-0 right-0 -mb-8"
          shadow
          onOpenAutoFocus={(e) => e.preventDefault()}
          className={clsx({ 'animate-shake': warning })}
        >
          <ActionBarIcon />
          <ActionBarBody>
            <ActionBarTitle>
              {scheme === 'danger'
                ? 'Careful - you have unsaved changes!'
                : 'Do you want to save these changes?'}
            </ActionBarTitle>
          </ActionBarBody>
          <ActionBarActionGroup>
            <ActionBarCancelButton disabled={isLoading} onClick={onCancel}>
              Reset
            </ActionBarCancelButton>
            <ActionBarConfirmButton
              onClick={onConfirm}
              loading={isLoading}
              className="sm:w-32 min-w-[128px]"
            >
              Save changes
            </ActionBarConfirmButton>
          </ActionBarActionGroup>
        </ActionBarContent>
      </ActionBar>
    </div>
  )
}
