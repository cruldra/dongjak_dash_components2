import React, {FC, useEffect, useState} from 'react';
import {DashBaseProps} from "../props/dash";
import {Group, NumberInput, Radio} from "@mantine/core";

interface Ratio {
    width: number;
    height: number;
}

const parseRatio = (ratio: string): Ratio => {
    const [width, height] = ratio.split(':').map(Number);
    return {width, height};
}

interface SizeValue {
    width: number;
    height: number;
    ratio: string;
}

interface SizeInputProps extends DashBaseProps {
    ratios?: string[];
    value?: SizeValue;
}


const SizeInput: FC<SizeInputProps> = ({
                                           ratios = [
                                               '16:9',
                                               '4:3',
                                               '1:1',
                                               '3:4',
                                               '9:16',
                                           ],
                                           value = {width: 1920, height: 1080, ratio: '16:9'},
                                           setProps
                                       }) => {
    const [width, setWidth] = useState<number>(value.width);
    const [height, setHeight] = useState<number>(value.height);
    const [selectedRatio, setSelectedRatio] = useState<string>(value.ratio);

    useEffect(() => {
        setProps({
            value: {
                width,
                height,
                ratio: selectedRatio
            }
        });
    }, [width, height, selectedRatio]);
    const handleWidthChange = (newWidth: number) => {
        setWidth(newWidth);
        if (selectedRatio) {
            const ratioObj = parseRatio(selectedRatio);
            setHeight(Math.round(newWidth * ratioObj.height / ratioObj.width));
        }
    };
    const handleRatioSelect = (ratio: string) => {
        setSelectedRatio(ratio);
        const ratioObj = parseRatio(ratio);
        if (width) {
            setHeight(Math.round(width * ratioObj.height / ratioObj.width));
        } else if (height) {
            setWidth(Math.round(height * ratioObj.width / ratioObj.height));
        }
    };

    const handleHeightChange = (newHeight: number) => {
        setHeight(newHeight);
        if (selectedRatio) {
            const ratioObj = parseRatio(selectedRatio);
            setWidth(Math.round(newHeight * ratioObj.width / ratioObj.height));
        }
    };

    return <>
        <NumberInput
            label="宽度"
            onChange={handleWidthChange}
            value={width}
            min={1}
        />
        <NumberInput
            label="高度"
            onChange={handleHeightChange}
            value={height}
            min={1}
        />

        <Radio.Group
            label="宽高比"
            value={selectedRatio}
            onChange={handleRatioSelect}
        >
            <Group mt="xs">
                {ratios
                    .map((ratio) => parseRatio(ratio))
                    .map((ratio, index) => (
                        <Radio
                            value={`${ratio.width}:${ratio.height}`}
                            key={index}
                            // onClick={() => handleRatioSelect(ratio)}
                            label={`${ratio.width}:${ratio.height}`}
                        />
                    ))}
            </Group>

        </Radio.Group>
    </>
};

export default SizeInput;