"use client";

import React, { useRef, useState } from "react";
import {
  Avatar,
  Button,
  Card,
  Input,
  Badge,
  CardHeader,
  CardBody,
} from "@nextui-org/react";
import Image from "next/image";
import { FaCamera, FaRegEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import BannerPic from "@/public/bannerpic.webp";
import ProfilePic from "@/public/UmerQadoos.webp";

export default function Profile() {
  const [bannerUrl, setBannerUrl] = useState<string>(BannerPic.src);
  const [profileUrl, setProfileUrl] = useState<string>(ProfilePic.src);

  const bannerInputRef = useRef<HTMLInputElement>(null);
  const profileInputRef = useRef<HTMLInputElement>(null);

  // Function to handle file input change
  const handleFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    type: string
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const data = new FormData();
      data.append("file", file);
      const response = await fetch("/api/upload", {
        method: "POST",
        body: data,
      });
      const result = await response.json();
      const imageUrl = result.link;

      if (type === "banner") {
        setBannerUrl(imageUrl);
      } else if (type === "profile") {
        setProfileUrl(imageUrl);
      }
    }
  };

  // Function to trigger file input click
  const triggerFileInput = (ref: React.RefObject<HTMLInputElement>) => {
    if (ref.current) {
      ref.current.click();
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-8 md:py-12">
      <div className="bg-background rounded-3xl overflow-hidden shadow-lg">
        {/* Banner Image */}
        <div className="relative h-48 md:h-64 bg-muted">
          <Image
            src={bannerUrl}
            width={1920}
            height={720}
            alt="Banner"
            className="w-full h-full object-cover"
            style={{ aspectRatio: "16/6", objectFit: "cover" }}
          />
          {/* Edit Banner Button */}
          <div className="absolute top-4 right-4">
            <Button
              className="bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md px-4 py-2"
              onClick={() => triggerFileInput(bannerInputRef)}
            >
              <FaRegEdit className="h-5 w-5" />
              <span className="sr-only">Edit Banner</span>
            </Button>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(e, "banner")}
              className="hidden"
              ref={bannerInputRef}
            />
          </div>
          {/* Edit Profile Picture Button */}
          <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 flex justify-center">
            <Badge
              isOneChar
              content={<FaCamera className="w-4 h-4" />}
              color="default"
              shape="circle"
              as="button"
              size="lg"
              placement="bottom-right"
              className="absolute w-8 h-8 transition-transform transform hover:scale-105 z-10"
              onClick={() => triggerFileInput(profileInputRef)}
            >
              <Avatar
                className="sm:w-20 sm:h-20 md:w-36 md:h-36 lg:w-36 lg:h-36 transition-transform border-background border-[8px] transform hover:scale-105"
                as="button"
                size="lg"
                name="umer"
                src={profileUrl}
                onClick={() => triggerFileInput(profileInputRef)}
              ></Avatar>
            </Badge>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(e, "profile")}
              className="hidden"
              ref={profileInputRef}
            />
          </div>
        </div>
        {/* Profile Details */}
        <div className="p-8 md:p-12">
          <div className="flex flex-col md:flex-row items-start justify-between mb-6">
            <div className="flex flex-col space-y-2">
              <h2 className="text-3xl font-semibold">John Doe</h2>
              <p className="text-muted-foreground text-lg">@johndoe</p>
              <div className="flex space-x-4">
                <Button className="bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md px-4 py-2">
                  Follow
                </Button>
                <Button className="bg-gray-500 text-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 rounded-md px-4 py-2">
                  Message
                </Button>
              </div>
            </div>
            <div className="flex flex-col space-y-4 mt-4 md:mt-0">
              <Button className="bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md px-4 py-2">
                Edit Profile
              </Button>
              <Button className="bg-gray-500 text-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 rounded-md px-4 py-2">
                Settings
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Side: Contact and Social Links */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <h3 className="text-xl font-semibold">Contact Information</h3>
                </CardHeader>
                <CardBody>
                  <Input placeholder="Add your address" className="mb-4" />
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="font-medium">Home</p>
                        <p className="text-sm text-muted-foreground">
                          123 Main St, Anytown USA
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <Button className="bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md px-3 py-1.5">
                          <FaRegEdit className="h-4 w-4" />
                          <span className="sr-only">Edit Address</span>
                        </Button>
                        <Button className="bg-red-500 text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 rounded-md px-3 py-1.5">
                          <MdDeleteForever className="h-4 w-4" />
                          <span className="sr-only">Delete Address</span>
                        </Button>
                      </div>
                    </div>
                    <Button className="bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md px-4 py-2 w-full">
                      Add Address
                    </Button>
                  </div>
                </CardBody>
              </Card>
              <Card>
                <CardHeader>
                  <h3 className="text-xl font-semibold">Phone Numbers</h3>
                </CardHeader>
                <CardBody>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+1 (555) 555-5555"
                    className="mb-4"
                  />
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">
                          +92 3185562461
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <Button className="bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md px-3 py-1.5">
                          <FaRegEdit className="h-4 w-4" />
                          <span className="sr-only">Edit Phone</span>
                        </Button>
                        <Button className="bg-red-500 text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 rounded-md px-3 py-1.5">
                          <MdDeleteForever className="h-4 w-4" />
                          <span className="sr-only">Delete Phone</span>
                        </Button>
                      </div>
                    </div>
                    <Button className="bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md px-4 py-2 w-full">
                      Add Phone Number
                    </Button>
                  </div>
                </CardBody>
              </Card>
              <Card>
                <CardHeader>
                  <h3 className="text-xl font-semibold">Social Links</h3>
                </CardHeader>
                <CardBody>
                  <Input placeholder="Add your social link" className="mb-4" />
                  <div className="space-y-4">
                    <Button className="bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md px-4 py-2 w-full">
                      Add Social Link
                    </Button>
                  </div>
                </CardBody>
              </Card>
            </div>

            {/* Right Side: Followers and Ratings */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <h3 className="text-xl font-semibold">Followers</h3>
                </CardHeader>
                <CardBody>
                  <div className="flex flex-col space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="font-medium">John Smith</p>
                        <p className="text-sm text-muted-foreground">
                          @johnsmith
                        </p>
                      </div>
                      <Button className="bg-gray-500 text-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 rounded-md px-3 py-1.5">
                        <FaRegEdit className="h-4 w-4" />
                        <span className="sr-only">Edit Follower</span>
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="font-medium">Jane Doe</p>
                        <p className="text-sm text-muted-foreground">
                          @janedoe
                        </p>
                      </div>
                      <Button className="bg-gray-500 text-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 rounded-md px-3 py-1.5">
                        <FaRegEdit className="h-4 w-4" />
                        <span className="sr-only">Edit Follower</span>
                      </Button>
                    </div>
                  </div>
                  <Button className="bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md px-4 py-2 w-full mt-4">
                    Add Follower
                  </Button>
                </CardBody>
              </Card>
              <Card>
                <CardHeader>
                  <h3 className="text-xl font-semibold">Ratings</h3>
                </CardHeader>
                <CardBody>
                  <div className="flex flex-col space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="font-medium">Rating</p>
                        <p className="text-sm text-muted-foreground">
                          4.5/5 (25 reviews)
                        </p>
                      </div>
                      <Button className="bg-gray-500 text-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 rounded-md px-3 py-1.5">
                        <FaRegEdit className="h-4 w-4" />
                        <span className="sr-only">Edit Rating</span>
                      </Button>
                    </div>
                  </div>
                  <Button className="bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md px-4 py-2 w-full mt-4">
                    Add Rating
                  </Button>
                </CardBody>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
