import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import {
  Modal,
  Button,
  Form,
  Input,
  DatePicker,
  message,
} from "antd";
import dayjs from "dayjs";
import { getEvents, createEvent } from "@/utils/api";
import { useNotifications } from "@/hooks/useNotifications";

export default function Home() {
  const [events, setEvents] = useState<any[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [searchQuery, setSearchQuery] = useState("");
  const [dateRange, setDateRange] = useState<[dayjs.Dayjs | null, dayjs.Dayjs | null]>([null, null]);

  useEffect(() => {
    fetchEvents();
  }, []);

  useNotifications(events);

  const fetchEvents = async () => {
    const res = await getEvents();
    setEvents(res.data);
  };

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    setModalVisible(true);
    form.setFieldsValue({ startTime: dayjs(date) });
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      const eventPayload = {
        ...values,
        startTime: dayjs(values.startTime).toISOString(),
      };
      await createEvent(eventPayload);
      message.success("Event created!");
      setModalVisible(false);
      form.resetFields();
      fetchEvents();
    } catch (err) {
      message.error("Please fill in required fields.");
    }
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">📅 My Calendar</h1>

      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <Input
          placeholder="Search events"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full md:w-1/2"
        />
        <DatePicker.RangePicker
          className="w-full md:w-1/2"
          onChange={(range) =>
            setDateRange(range as [dayjs.Dayjs, dayjs.Dayjs])
          }
        />
      </div>

      <Calendar
        onClickDay={handleDateClick}
        className="border rounded-lg p-2"
      />

      {/* Event List */}
      <ul className="mt-6 space-y-4">
        {events
          .filter((event) => {
            const inDateRange =
              !dateRange[0] ||
              !dateRange[1] ||
              (dayjs(event.startTime).isAfter(dateRange[0]) &&
                dayjs(event.startTime).isBefore(dateRange[1]));

            const matchesSearch =
              event.title
                .toLowerCase()
                .includes(searchQuery.toLowerCase()) ||
              event.description
                ?.toLowerCase()
                .includes(searchQuery.toLowerCase());

            return inDateRange && matchesSearch;
          })
          .map((event) => (
            <li key={event.id} className="border p-3 rounded shadow">
              <b className="block">{event.title}</b>
              <small>
                {dayjs(event.startTime).format("MMM D, YYYY h:mm A")}
              </small>
              <p className="mt-1">{event.description}</p>
              <div className="flex gap-2 mt-2 flex-wrap">
                {event.media?.map((item: any, idx: number) =>
                  item.type === "image" ? (
                    <img
                      key={idx}
                      src={item.url}
                      alt="media"
                      className="w-24 h-24 object-cover rounded"
                    />
                  ) : (
                    <video
                      key={idx}
                      controls
                      className="w-40 h-24 rounded"
                    >
                      <source src={item.url} />
                    </video>
                  )
                )}
              </div>
            </li>
          ))}
      </ul>

      {/* Modal for creating event */}
      <Modal
        title="Create Event"
        open={modalVisible}
        onOk={handleOk}
        onCancel={() => setModalVisible(false)}
        okText="Save Event"
      >
        <Form layout="vertical" form={form}>
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item name="description" label="Description">
            <Input />
          </Form.Item>

          <Form.Item
            name="startTime"
            label="Date & Time"
            rules={[{ required: true }]}
          >
            <DatePicker showTime className="w-full" />
          </Form.Item>

          <Form.Item name="media" label="Upload Media">
            <Input
              type="file"
              accept="image/*,video/*"
              multiple
              onChange={(e) => {
                const files = Array.from(e.target.files || []);
                const previews = files.map((file) => {
                  return new Promise((resolve) => {
                    const reader = new FileReader();
                    reader.onload = () => {
                      const type = file.type.startsWith("image")
                        ? "image"
                        : "video";
                      resolve({
                        type,
                        url: reader.result as string,
                      });
                    };
                    reader.readAsDataURL(file);
                  });
                });
                Promise.all(previews).then((result) => {
                  form.setFieldsValue({ media: result });
                });
              }}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
