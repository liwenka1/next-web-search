"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"

interface SettingModalProps {
  TriggerChild: React.ReactNode
}

const SettingModal: React.FC<SettingModalProps> = ({ TriggerChild }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{TriggerChild}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your account and remove your data from our
            servers.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default SettingModal
