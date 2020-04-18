import { formatDate } from 'utils';

export const deleteNotificationRequestFormatter = ({ id }) => ({
    userId: 246309,
    notificationId: id,
    status: 'DELETED',
});

export const getNotificationsResponseFormatter = ({
    events = [],
    totalRecords,
    totalUnread,
    totalUnseen,
}) => {
    return {
        totalUnread: Number(totalUnread),
        totalUnseen: Number(totalUnseen),
        total: Number(totalRecords),
        notifications: events.map(event => ({
            ...event,
            closeOnClick: true,
            id: event.notificationId,
            message: event.summary,
            timestamp: formatDate(event.timestamp, 'MM/DD/YYYY hh:mm A', null),
        })),
    };
};

export const onClickNotification = ({ actionUrl }) => {
    // window.location.href = actionUrl;
};

export const updateNotificationRequestFormatter = ({ id }) => ({
    userId: 246309,
    notificationId: id,
    status: 'READ',
});

export const updateNotificationsStatusRequestFormatter = () => ({
    userId: 246309,
});
