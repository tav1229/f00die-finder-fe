import socialNetwork from "@/assets/images/social-network.png";
import congThuong from "@/assets/images/congThuong.png";
import { useLocation } from "react-router-dom";

export default function Footer() {
    const location = useLocation();
    return (
        <footer className={`flex w-full justify-center pt-5 ${location.pathname === '/' ? 'bg-white' : 'bg-[#EEEEEE]'}`}>
            <div className="w-full flex justify-center bg-white pb-10">
                <div className="grid grid-cols-5 gap-5 text-sm max-w-[1108px] mt-5 ">
                    <div className="flex flex-col">
                        <h2 className="text-[#d02028] text-2xl font-bold">
                            F00die Finder
                        </h2>
                        <p className="text-justify mr-7 text-[#606060]">
                            F00die Finder là Mạng lưới nhà hàng NGON, uy tín và chất
                            lượng. Giúp thực khách đặt bàn dễ dàng, được tặng kèm ưu
                            đãi mà không cần mua Deal, Voucher. Giải pháp đột phá
                            mới cho câu chuyện ăn gì, ở đâu!
                        </p>
                    </div>
                    <div className="flex flex-col pl-5 gap-1">
                        <h3 className="font-medium h-7">Về F00die Finder</h3>
                        <p className="mr-5 text-[#606060]">
                            Những điều thú vị về F00die Finder – Có thể bạn chưa biết!
                        </p>
                        <p className="text-[#606060] ">Vì sao F00die Finder đang phát triển!</p>
                        <p className="text-[#606060] ">Hướng dẫn đặt bàn</p>
                        <p className="text-[#606060] ">Chính sách bảo mật</p>
                    </div>
                    <div className="flex flex-col gap-1">
                        <h3 className="font-medium h-7">Tương tác</h3>
                        <p className="text-[#606060] ">Khiếu nại</p>
                        <p className="text-[#606060] ">Câu hỏi thường gặp</p>
                        <p className="text-[#606060] ">Dành cho Nha hàng</p>
                        <p className="text-[#606060] ">Tin tức</p>
                        <p className="text-[#606060] ">Liên hệ</p>
                        <p className="text-[#606060] ">Địa điểm gần bạn</p>
                    </div>

                    <div className="flex flex-col gap-3  font-medium">
                        <h3>Tham gia với chúng tôi</h3>
                        <img
                            className="h-11 w-36"
                            src={socialNetwork}
                            alt="social network"
                        />
                        <h3>Thương hiệu được chứng nhận</h3>
                        <img
                            className="h-auto w-36"
                            src={congThuong}
                            alt="congThuong"
                        />
                    </div>

                    <div className="col-span-4">
                        <h2 className="font-semibold uppercase">
                            © COPYRIGHT 2010 F00dieFinder.JSC, ALL RIGHTS RESERVED
                        </h2>
                        <h2 className="font-semibold uppercase text-[#0049d9] mt-4">
                            CÔNG TY CỔ PHẦN F00die Finder
                        </h2>
                        <p className="text-[#757575] mt-2">
                            Văn phòng Đà Nẵng: Tầng 2 tòa nhà thông minh, Trường Đại
                            học Bách Khoa Đà Nẵng
                        </p>
                        <p className="text-[#757575] mt-2">
                            Hotline: 1900 1234 | Email: vuanhtran@gmail.com
                        </p>
                        <p className="text-[#757575] mt-2">Trần Anh Vũ</p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
