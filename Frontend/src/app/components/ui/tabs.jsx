// components/ui/tabs.tsx
import * as React from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs"; // Asumimos que estás usando Radix UI para la implementación de Tabs

// Un componente de UI general para Tabs
const CustomTabs = ({ tabsData }) => {
  return (
    <Tabs defaultValue={tabsData[0].value} className="w-full space-y-4">
      <TabsList className="flex space-x-4">
        {tabsData.map((tab) => (
          <TabsTrigger key={tab.value} value={tab.value} className="p-2 font-semibold text-gray-800 hover:text-blue-500 focus:ring-2 focus:ring-blue-500">
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>

      {tabsData.map((tab) => (
        <TabsContent key={tab.value} value={tab.value} className="p-4 bg-gray-50 rounded-lg shadow-lg">
          {tab.content}
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default CustomTabs;
