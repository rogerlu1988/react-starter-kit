import { useState } from 'react';
import { useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { Id } from '../../convex/_generated/dataModel';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';
import { Textarea } from '../ui/textarea';
import type { ChangeEvent } from 'react';

interface CancelAppointmentProps {
  appointmentId: Id<'appointments'>;
  serviceName: string;
  date: string;
  time: string;
  onSuccess: () => void;
  onError: (error: string) => void;
}

export function CancelAppointment({ 
  appointmentId, 
  serviceName, 
  date, 
  time,
  onSuccess,
  onError 
}: CancelAppointmentProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [reason, setReason] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const initiateRefund = useMutation(api.stripe.initiateRefund);

  const handleCancel = async () => {
    if (!reason) {
      onError('Please provide a reason for cancellation');
      return;
    }

    setIsProcessing(true);
    try {
      await initiateRefund({
        appointmentId,
      });
      onSuccess();
      setIsOpen(false);
    } catch (error) {
      onError(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      <Button 
        variant="destructive" 
        onClick={() => setIsOpen(true)}
      >
        Cancel Appointment
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cancel Appointment</DialogTitle>
            <DialogDescription>
              Are you sure you want to cancel this appointment? This will initiate a refund for your payment.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <p><strong>Service:</strong> {serviceName}</p>
              <p><strong>Date:</strong> {date}</p>
              <p><strong>Time:</strong> {time}</p>
            </div>

            <div className="space-y-2">
              <label htmlFor="reason" className="text-sm font-medium">
                Reason for Cancellation
              </label>
              <Textarea
                id="reason"
                value={reason}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setReason(e.target.value)}
                placeholder="Please provide a reason for cancellation..."
                rows={3}
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsOpen(false)}
              disabled={isProcessing}
            >
              Keep Appointment
            </Button>
            <Button
              variant="destructive"
              onClick={handleCancel}
              disabled={isProcessing}
            >
              {isProcessing ? 'Processing...' : 'Confirm Cancellation'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
