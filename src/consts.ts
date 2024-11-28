export const APP_NAME = 'Car Rental';
export const APP_DESCRIPTION = 'Dịch vụ thuê xe chuyên nghiệp, uy tín';
export const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1469285994282-454ceb49e63c?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'

export const NOTIFICATION_MSG = {
	// Gửi yêu cầu thuê
	BOOKING_SENT: {
		key: 'BOOKING_SENT',
		title: 'has sent a request to book a car',
	},
  // Duyệt yêu cầu thuê
  // Chấp thuận
  BOOKING_APPROVED: {
    key: 'BOOKING_APPROVED',
    title: 'has approved your request to book a car',
  },
  // Từ chối
  BOOKING_REJECTED: {
    key: 'BOOKING_REJECTED',
    title: 'has rejected your request to book a car',
  },

  // Gửi đánh giá
  REVIEW_SENT: {
    key: 'REVIEW_SENT',
    title: 'has sent a review',
  }
};
