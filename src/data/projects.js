export const projects = [
    {
        id: 1,
        title: "UAV Flight Control & Vision Pipeline for Maritime Robotics",
        description: "Developing real-time computer vision and autonomous flight systems for a USV-UAV maritime robotics platform competing in RobotX.",
        tags: ["pymavlink", "ArduPilot", "Jetson Orin Nano", "Pixhawk 6X", "OpenCV", "UDP Networking", "Computer Vision"],
        github: "https://github.com/OPTIPRIME-SIT?view_as=public",
        link: null,
        featured: true
    },
    {
        id: 2,
        title: "TurtleBot3 Autonomous Maze Navigation",
        description: "Built a ROS-based autonomous navigation system for TurtleBot3, implementing SLAM mapping, AMCL localisation, and waypoint automation in a custom Gazebo maze environment.",
        tags: ["ROS", "Gazebo", "RViz", "SLAM", "Python", "AMCL", "Navigation Stack"],
        github: "https://github.com/jabchup/turtlebot3-maze-navigation.git",
        link: null,
        featured: true
    },
    {
        id: 3,
        title: "ROS Inspection Robot System",
        description: "Built a multi-node ROS inspection robot demonstrating pub/sub topics, custom services, and tf2 transforms through a unified launch system using rospy.",
        tags: ["ROS", "rospy", "tf2", "Python", "Catkin"],
        github: "https://github.com/jabchup/ros-inspection-robot.git",
        link: null,
        featured: true
    },
    {
        id: 4,
        title: "Aerial Image Classification — Dockerised FastAPI Inference System",
        description: "Trained and evaluated six architectures — from VGG16 and DenseNet to Vision Transformers — for aerial image classification across four land-use classes, achieving 97.50% accuracy with a fine-tuned EfficientNet-B3 and deployed inference via a Dockerised FastAPI endpoint.",
        tags: ["PyTorch", "EfficientNet", "Swin Transformer", "Transfer Learning", "Computer Vision", "FastAPI", "Docker", "Python"],
        github: "https://github.com/h4nzolo/ML-Assignment-Grp29",
        link: null,
        featured: true
    },
    {
        id: 5,
        title: "Multi-Protocol IoT Air Quality Monitoring System",
        description: "Built a multi-protocol IoT air quality monitoring system with triple-layer redundancy — WiFi/MQTT, LoRa mesh, and BLE — for reliable smoke detection across nodes.",
        tags: ["Arduino", "ESP32", "LoRa", "MQTT", "BLE", "IoT", "C++"],
        github: "https://github.com/csc2106-team16/meshstacklorable",
        link: null,
        featured: true
    },
    {
        id: 6,
        title: "Edge AI Tremor Detection on Raspberry Pi Pico W",
        description: "Developed a FreeRTOS-based IMU tremor detection system on Raspberry Pi Pico W, wrapping an Edge Impulse C++ classifier in a C-callable interface with WiFi/MQTT and LoRa failover.",
        tags: ["C", "C++", "Edge Impulse", "TFLite", "FreeRTOS", "Raspberry Pi Pico W", "MQTT", "LoRa", "IMU"],
        github: "https://github.com/jabchup/imu-tremor-detection",
        link: null,
        featured: true
    },
    {
        id: 7,
        title: "Edge Impulse Cat Behaviour Classifier with LoRaWAN",
        description: "Built an IMU-based cat behaviour classifier using Edge Impulse on ESP32 with MPU6050, transmitting inference results (happy, distress, sick) over LoRaWAN to TTN with LED and buzzer alerts on downlink.",
        tags: ["Edge Impulse", "ESP32", "MPU6050", "LoRaWAN", "Arduino", "TinyML", "C++"],
        github: "https://github.com/jabchup/cat-behaviour-classifier",
        link: null,
        featured: true
    }
];
